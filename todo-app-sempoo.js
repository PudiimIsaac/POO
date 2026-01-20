// ✅ VARIÁVEIS GLOBAIS (Bagunçadas)
class GerenciarTarefas {
    constructor() {
this.tarefas = [];
this.proximoId = 1;
this.listaElement = null;
this.inputElement = null;
this.btnAdicionar = null;
    }
}
// ✅ INICIALIZAÇÃO CONFUSA
inicializar() {
    this.listaElement = document.getElementById('lista-tarefas');
    this.inputElement = document.getElementById('nova-tarefa');
    this.btnAdicionar = document.getElementById('btn-adicionar');
    
    this.carregarDoLocalStorage();
    this.renderizarTudo();
    
    // Eventos espalhados
    this.btnAdicionar.addEventListener('click', adicionarTarefa);
    
    this.inputElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarTarefa();
        }
    });
    
    // Eventos delegados misturados
    this.listaElement.addEventListener('click', function(e) {
        if (e.target.type === 'checkbox') {
            const li = e.target.closest('.tarefa');
            const id = parseInt(li.dataset.id);
            alternarConclusao(id);
        }
        
        if (e.target.classList.contains('btn-remover')) {
            const li = e.target.closest('.tarefa');
            const id = parseInt(li.dataset.id);
            removerTarefa(id);
        }
    });
    
    // Botões adicionais soltos
    this.document.getElementById('limpar-concluidas').addEventListener('click', function() {
        this.tarefas = tarefas.filter(t => !t.concluida);
        salvarNoLocalStorage();
        renderizarTudo();
    });
}

// ✅ FUNÇÕES SOLTAS NO ESCOPO GLOBAL
adicionarTarefa() {
    const descricao = inputElement.value.trim();
    
    if (!descricao) {
        alert('Digite uma tarefa!');
        return;
    }
    
    const novaTarefa = {
        id: proximoId++,
        descricao: descricao,
        concluida: false,
        dataCriacao: new Date()
    };
    
    tarefas.push(novaTarefa);
    inputElement.value = '';
    salvarNoLocalStorage();
    renderizarTudo();
}

removerTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarNoLocalStorage();
    renderizarTudo();
}

alternarConclusao(id) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].concluida = !tarefas[i].concluida;
            break;
        }
    }
    salvarNoLocalStorage();
    renderizarTudo();
}

// ✅ FUNÇÃO GIGANTE PARA RENDERIZAR
renderizarTudo() {
    this.listaElement.innerHTML = '';
    
    for (let i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i];
        
        const li = document.createElement('li');
        li.className = 'tarefa';
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }
        li.dataset.id = tarefa.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        
        const span = document.createElement('span');
        span.textContent = tarefa.descricao;
        
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn-remover';
        btnRemover.textContent = '×';
        btnRemover.title = 'Remover tarefa';
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnRemover);
        
        this.listaElement.appendChild(li);
    }
    
    // Atualizar estatísticas (código repetido em vários lugares)
    atualizarEstatisticas();
}

// ✅ OUTRA FUNÇÃO SOLTA
atualizarEstatisticas() {
    const totalElement = document.getElementById('total');
    const concluidasElement = document.getElementById('concluidas');
    
    if (totalElement) {
        totalElement.textContent = tarefas.length;
    }
    
    if (concluidasElement) {
        const concluidas = tarefas.filter(t => t.concluida).length;
        concluidasElement.textContent = concluidas;
    }
}

// ✅ FUNÇÕES DE LOCALSTORAGE ESPALHADAS
salvarNoLocalStorage() {
    const dados = {
        tarefas: tarefas,
        proximoId: proximoId
    };
    this.localStorage.setItem('todoAppSemPOO', JSON.stringify(dados));
}

function carregarDoLocalStorage() {
    const dados = JSON.parse(localStorage.getItem('todoAppSemPOO'));
    
    if (dados) {
        tarefas = dados.tarefas;
        proximoId = dados.proximoId;
    }
}

// ✅ FUNÇÃO PARA EDITAR (FEITA DEPOIS, MISTURADA)
function editarTarefa(id, novaDescricao) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].descricao = novaDescricao;
            break;
        }
    }
    salvarNoLocalStorage();
    renderizarTudo();
}

// ✅ FUNÇÃO PARA FILTRAR (ADICIONADA DEPOIS)
function filtrarTarefas(filtro) {
    let tarefasFiltradas = [];
    
    if (filtro === 'todas') {
        tarefasFiltradas = tarefas;
    } else if (filtro === 'ativas') {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else if (filtro === 'concluidas') {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    }
    
    // Código quase igual ao renderizarTudo() 😕
    listaElement.innerHTML = '';
    
    for (let i = 0; i < tarefasFiltradas.length; i++) {
        const tarefa = tarefasFiltradas[i];
        
        const li = document.createElement('li');
        li.className = 'tarefa';
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }
        li.dataset.id = tarefa.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        
        const span = document.createElement('span');
        span.textContent = tarefa.descricao;
        
        const btnRemover = document.createElement('button');
        btnRemover.className = 'btn-remover';
        btnRemover.textContent = '×';
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnRemover);
        
        listaElement.appendChild(li);
    }
}

// ✅ INICIALIZAR QUANDO A PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', inicializar);

// ✅ MAIS FUNÇÕES ADICIONADAS SEM ORGANIZAÇÃO...
function exportarParaTexto() {
    let texto = 'Minhas Tarefas:\n\n';
    
    for (let i = 0; i < tarefas.length; i++) {
        const status = tarefas[i].concluida ? '[✓]' : '[ ]';
        texto += `${status} ${tarefas[i].descricao}\n`;
    }
    
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.txt';
    a.click();
}

// ... e assim vai crescendo desorganizadamente!