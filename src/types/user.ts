export interface User {
  user_email: string;
  user_name: string;
  user_nickName: string;
  user_psw?: string;
  user_hash?: string;
  user_createdAt?: Date;  // Optional because of the default value
  user_updatedAt?: Date;
  seal_latest?: string[];  // Array of ObjectIds referencing "Seal"
  user_loginAt?: Date;
}

export interface UserNew {
    user_email: string;
    user_name: string;
    user_nickName?: string;
    user_psw: string;
} 
