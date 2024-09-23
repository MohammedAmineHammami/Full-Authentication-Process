import { create } from "zustand";
import axios from "axios";

const baseUrl = "http://localhost:3000/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  message: null,
  login: async (loginBody) => {
    set({ isLoading: true, error: null });
    console.log("from login");
    try {
      const res = await axios.post(`${baseUrl}/login`, loginBody);
      set({
        user: res.data.user,
        isLoading: false,
        isAuthenticated: true,
        message: res.data.message,
      });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
      throw err;
    }
  },

  register: async (registerBody) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseUrl}/register`, registerBody);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: res.data.message,
      });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
      throw err;
    }
  },

  verifyAccount: async (code) => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.post(`${baseUrl}/verify-email`, {
        verificationCode: code,
      });
      set({
        isLoading: false,
        user: res.data.user,
        isAuthenticated: true,
        message: res.data.message,
      });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseUrl}/logout`);
      set({
        isLoading: false,
        user: null,
        isAuthenticated: false,
        message: res.data.message,
      });
    } catch (err) {
      set({ error: err.response?.data.message, isLoading: false });
      throw err;
    }
  },

  forgotPass: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseUrl}/forgot-pass`, { email: email });
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
      throw err;
    }
  },

  resetPass: async (resetBody, resetToken) => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.post(
        `${baseUrl}/reset-pass/${resetToken}`,
        resetBody
      );
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.get(`${baseUrl}/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: res.data.message,
      });
    } catch (err) {
      set({
        error: err.response.data.message,
        isLoading: false,
      });
      throw err;
    }
  },

  loginWithGoogle: async () => {
    set({ error: null, isLoading: true });
    try {
      window.open(`${baseUrl}/google`, "_self");
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  loginWithGithub: async () => {
    set({ error: null, isLoading: true });
    try {
      window.open(`${baseUrl}/github`, "_self");
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  onSuccess: async () => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.get(`${baseUrl}/success`);
      set({ user: res?.data?.user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: err?.response?.data?.message, isLoading: false });
      throw err;
    }
  },

  oAuthLogout: async () => {
    set({ error: null, isLoading: true });
    try {
      await axios.get(`${baseUrl}/oauth-logout`);
    } catch (err) {
      set({ error: err.response?.data.message, isLoading: false });
    }
  },
}));
