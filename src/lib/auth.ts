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

			const { data: profileData, error: profileError } = await supabase
				.from('profiles')
				.select('username, name')
				.eq('id', authUser.id)
				.single();

			if (profileError) throw profileError;

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
export const signInWithMagicLink = async (email: string) => {
	try {
		const { error } = await supabase.auth.signInWithOtp({ email });
		if (error) throw error;
		return { type: 'success', message: 'Check your email for the login link!' };
	} catch (error) {
		return { type: 'error', message: error.message };
	}
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

export async function changeUsername(userId: string, username: string) {
	try {
		const { error } = await supabase.from('profiles').update({ username }).eq('id', userId);

		if (error) throw error;
		return { type: 'success', message: 'Username updated!' };
	} catch (error) {
		return { type: 'error', message: error.message };
	}
}

export async function changeName(userId: string, name: string) {
	try {
		const { error } = await supabase.from('profiles').update({ name: name }).eq('id', userId);

		if (error) throw error;
		return { type: 'success', message: 'Name updated!' };
	} catch (error) {
		return { type: 'error', message: error.message };
	}
}

export async function deleteAccount(userId: string) {
	try {
		const { error } = await supabase.from('profiles').delete().eq('id', userId);

		if (error) throw error;
		return { type: 'success', message: 'Account deleted!' };
	} catch (error) {
		return { type: 'error', message: error.message };
	}
}

export const signOut = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		location.reload();

		if (error) throw error;
		return { type: 'success', message: 'Logged out!' };
	} catch (error) {
		return { type: 'error', message: error.message };
	}
	return;
};
