import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user-services.module'

@Injectable()
export class AuthService {
  private authenticatedUsers = new Set<string>(); // Usar Set para almacenar emails autenticados

  constructor(private readonly UserService: UserService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    // Llama al método validateUser del UserService
    const user = await this.UserService.validateUser(email, password);
    return !!user; // Devuelve true si el usuario es válido, de lo contrario false
  }
  login(email: string): void {
    this.authenticatedUsers.add(email);
  }

  logout(email: string): void {
    this.authenticatedUsers.delete(email);
  }

  isAuthenticated(email: string): boolean {
    return this.authenticatedUsers.has(email);
  }
}
