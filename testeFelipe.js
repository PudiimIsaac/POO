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
            <input type="checkbox" class="${this.concluida ? "concluida" : ""}">
            <span>${this.descricao}</span>
        </li>
        `;
    }
}

class Gerenciartarefas {
    constructor() {
        this.tarefas = [];
        this.proximo = 1;
        this.container = document.getElementById("lista-tarefa");
        this.init()
    }
    init() {
        this.carregarLocalStorage();
        this.renderizar();
        this.configurarEventos();
    }

    salvarNoLocalStorage() {
        const dados = {
            tarefas: this.tarefas,
            proximoId: this.proximoId
        };
        localStorage.setItem('todo-app-sempoo - V2.js', JSON.stringify(dados));
    }

    carregarLocalStorage() {
        const dados = JSON.parse(localStorage.getItem("todo-app-sempoo - V2"));
        if (dados) {
            this.tarefas = dados.tarefas.map(tarefa => {
                new tarefa(tarefa.id, tarefa.descricao);
            });
            this.proximId = dados.proximoId;
        }
    }

    renderizar() {
        this.Container.innerHTML = '';
        this.tarefas.forEach((tarefa) => {
            this.container.innerHTML += tarefa.toHTML()
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
        document.getElementByIf("btn-adicionar").addEventListener('click', (e) => {
            const input = document.getElementById("nova-tarefa");
            this.adicionarElemento(input.ariaValueMax.trim());
        })
    }

}

const app = new Gerenciartarefas();