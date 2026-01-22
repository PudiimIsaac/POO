class Tarefa {
  constructor(id, descricao, concluida = false) {
    this.id = id;
    this.descricao = descricao;
    this.concluida = concluida;
    this.dataCriacao = new Date();
  }

  toHTML() {
    return `
        <li>
            <input type="checkbox" class="tarefa ${this.concluida ? 'concluida' : ''}">
            <span>${this.descricao}</span>      
        </li>
    `
  }
}

class GerenciarTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoId = 1;
    this.container = document.getElementById("lista-tarefas");
    this.init();
  }
  init() {
    this.carregarLocalStorage();
    this.renderizar();
    this.configurarEventos();
  }

  salvarNoLocalStorage() {
    const dados = {
      tarefas: this.tarefas,
      proximoId: this.proximoId,
    };
    localStorage.setItem("todoAppSemPOO", JSON.stringify(dados));
  }

  carregarLocalStorage() {
    const dados = JSON.parse(localStorage.getItem("todoAppSemPOO"));
        if(dados){
            this.tarefas = dados.tarefas.map(tarefa => 

                new Tarefa(tarefa.id, tarefa.descricao)
            );
            this.proximoId = dados.proximoId;
        }
  }

  renderizar() {
    this.container.innerHTML = '';
    this.tarefas.forEach((tarefa) => {
      this.container.innerHTML += tarefa.toHTML();
    });
  }

  removerTarefa(id) {
    this.tarefas = this.tarefas.filter((t) => t.id !== id);
    this.salvarNoLocalStorage();
    this.renderizar();
  }

  adicionarElemento(descricao) {
    const tarefa = new Tarefa(this.proximoId++, descricao);
    this.tarefas.push(tarefa);
    this.salvarNoLocalStorage();
    this.renderizar();
  }

  configurarEventos() {
    document.getElementById("btn-adicionar").addEventListener('click', (e) => {
        const input = document.getElementById("nova-tarefa");
        this.adicionarElemento(input.value.trim());
    })
  }
}

const app = new GerenciarTarefas();