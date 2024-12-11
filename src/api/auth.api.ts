import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/store/auth.store';

const authStore = useAuthStore();

export const login = async (email: string, password: string) => {
  await api.post('/auths/login', {
    email,
    password
  })

  authStore.setIsAuthenticated();
}

export const register = async (name: string, email: string, password: string, image: File, role?: string) => {
  const form = new FormData();
  form.append('name', name);
  form.append('email', email);
  form.append('password', password);
  form.append('file', image);
  if (role) {
    form.append('role', role);
  }
  await api.post('/users/sign-up', form)
}
