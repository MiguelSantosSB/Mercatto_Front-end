import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: string[] = [];
  userInput: string = '';
  currentStep: number = 0;
  orderDetails = {
    name: '',
    phone: '',
    address: '',
    paymentMethod: ''
  };
  total = 9.75;

  constructor(private cartService: CartService, private http: HttpClient) {
    this.startChat();
  }

  startChat() {
    this.messages.push('Olá! Vamos finalizar seu pedido.');
    this.askForName();
  }

  askForName() {
    this.messages.push('Por favor, digite seu nome:');
    this.currentStep = 1;
  }

  askForPhone() {
    this.messages.push('Agora, digite seu número de telefone:');
    this.currentStep = 2;
  }

  askForAddress() {
    this.messages.push('Por favor, informe seu endereço:');
    this.currentStep = 3;
  }

  askForPaymentMethod() {
    this.messages.push('Escolha sua forma de pagamento (digite "dinheiro" ou "cartão"):');
    this.currentStep = 4;
  }

  processInput() {
    const input = this.userInput.trim();
    if (!input) return;

    switch (this.currentStep) {
      case 1:
        this.orderDetails.name = input;
        this.askForPhone();
        break;
      case 2:
        this.orderDetails.phone = input;
        this.askForAddress();
        break;
      case 3:
        this.orderDetails.address = input;
        this.askForPaymentMethod();
        break;
      case 4:
        this.orderDetails.paymentMethod = input;
        this.finalizeOrder();
        break;
    }

    this.userInput = '';
  }

  async finalizeOrder() {
    const message = `Cliente: ${this.orderDetails.name}\n` +
                    `Telefone: ${this.orderDetails.phone}\n` +
                    `Endereço: ${this.orderDetails.address}\n` +
                    `Pagamento: ${this.orderDetails.paymentMethod}\n` +
                    `Total: R$ ${this.total.toFixed(2)}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    });

    const body = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    };

    try {
      this.messages.push(`Obrigado, ${this.orderDetails.name}!`);
      this.messages.push(`Seu pedido no valor de R$ ${this.total.toFixed(2)} serã repassado para loja e enviado para você.`);
      this.messages.push('Tenha um ótimo dia!');
    } catch (error) {
      console.error('Erro ao enviar dados para DeepSeek:', error);
      this.messages.push('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
    }
  }
}
