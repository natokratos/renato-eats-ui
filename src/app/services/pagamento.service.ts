import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private API = environment.pagamentoUrl + '/pagamentos';

  constructor(private http: HttpClient) {
  }

  cria(pagamento): Observable<any> {
    console.log("cria pagamento", pagamento);
    this.ajustaIds(pagamento);
    console.log("cria pagamento", pagamento);
    return this.http.post(`${this.API}`, pagamento);
  }

  confirma(pagamento): Observable<any> {
    this.ajustaIds(pagamento);
    return this.http.put(`${this.API}/${pagamento.id}`, null);
  }

  cancela(pagamento): Observable<any> {
    this.ajustaIds(pagamento);
    return this.http.delete(`${this.API}/${pagamento.id}`);
  }

  // adicionado
  private ajustaIds(pagamento) {
    pagamento.formaDePagamentoId = pagamento.formaDePagamentoId || pagamento.formaDePagamento.id;
    pagamento.pedidoId = pagamento.pedidoId || pagamento.pedido.id;
  }

}
