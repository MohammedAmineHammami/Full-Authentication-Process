import { create } from "zustand";
import axios from "axios";

const baseUrl = "http://localhost:3001/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  message: null,
  login: async (loginBody) => {
    set({ isLoading: true, error: null });
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
    }
  },

  verifyAccount: async (code) => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.post(`${baseUrl}/verify-email`, code);
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseUrl}/logout`);
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  forgotPass: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${baseUrl}/forgot-pass`, email);
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },

  resetPass: async (resetBody, resetToken) => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.post(
        `{baseUrl}/reset-pass/${resetToken}`,
        resetBody
      );
      set({ isLoading: false, message: res.data.message });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
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
    }
  },

  loginWithGoogle: () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  },

  loginWithGithub: () => {
    window.open(`${baseUrl}/auth/github`, "_self");
  },

  oauthLogOut: async () => {
    set({ error: null, isLoading: true });
    try {
      const res = await axios.get(`${baseUrl}/oauth-logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: res.data.message,
      });
    } catch (err) {
      set({ error: err.response.data.message, isLoading: false });
    }
  },
}));
