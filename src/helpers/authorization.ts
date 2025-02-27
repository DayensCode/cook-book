export interface User {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    third_name?: string;
    isAdmin?: boolean;
  }
  
  const ADMIN_CREDENTIALS: User = {
    username: "admin",
    email: "admin@mail.ru",
    password: "1234",
    first_name: "Админ",
    last_name: "Системы",
    third_name: "",
    isAdmin: true,
  };
  
  const STORAGE_KEY = "users";
  const AUTH_KEY = "authUser";
  
  export function initializeUsers(): void {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([ADMIN_CREDENTIALS]));
    } else {
      const users = getUsers();
      if (!users.some(user => user.email === ADMIN_CREDENTIALS.email)) {
        users.unshift(ADMIN_CREDENTIALS);
        saveUsers(users);
      }
    }
  }
  
  export function getUsers(): User[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }
  
  export function saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
  
  export function registerUser(username: string,email: string, password: string, first_name: string, last_name: string, third_name: string): boolean {
    const users = getUsers();
  
    if (users.some(user => user.email === email)) {
      return false;
    }
  
    users.push({ username, email,password, first_name, last_name, third_name, isAdmin: false });
    saveUsers(users);
    return true;
  }
  
  export function loginUser(email: string, password: string): boolean {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return true;
    }
  
    return false;
  }
  
  export function getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  }
  
  export function logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
  