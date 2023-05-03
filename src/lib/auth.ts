import supabase from '$lib/supabase';
import { writable } from 'svelte/store';

export const user = writable({});

// obtain user info from current session
export async function getSessionUser() {
	try {
		const {
			data: { session },
			error
		} = await supabase.auth.getSession();

		if (error) throw error;
		if (session && session.user) {
			const { user: authUser } = session;

			// Fetch the user's profile data from the profiles table
			const { data: profileData, error: profileError } = await supabase
				.from('profiles')
				.select('username, name')
				.eq('id', authUser.id)
				.single();

			if (profileError) throw profileError;

			// Add the username and name fields to the user object
			const userWithProfile = {
				...authUser,
				username: profileData.username,
				name: profileData.name
			};

			user.set(userWithProfile);
			return userWithProfile;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
	return null;
}

// handle logins
export const login = async (email) => {
	try {
		const { error } = await supabase.auth.signInWithOtp({ email });
		if (error) throw error;
		console.log('Check your email for a login link');
	} catch (error) {
		console.log('Error thrown:', error.message);
	}
	return;
};

export async function signInWithGoogle() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			queryParams: {
				access_type: 'offline',
				prompt: 'consent'
			}
		}
	});
}

export const logout = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		location.reload();

		if (error) throw error;
		console.log('Logged out');
	} catch (error) {
		console.log('Error thrown:', error.message);
	}
	return;
};
