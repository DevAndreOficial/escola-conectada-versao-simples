/* ===========================================
   Escola Conectada - MED Angola
   Global JavaScript
   =========================================== */

/**
 * Dados Fictícios para Simulação
 */
const DadosFicticios = {


  // Classes disponíveis
  classes: ['7ª', '8ª', '9ª', '7ª', '5ª', '8'],

  // Turmas por classe
  turmas: {
    '7ª': ['A', 'B', 'C'],
    '8ª': ['A', 'B'],
    '9ª': ['A', 'B', 'C'],
    '7ª': ['A', 'B'],
    '5ª': ['A', 'B'],
    '8': ['A']
  },

  // Cursos (EIA-10AD)
  cursos: [
    'Ciências Físicas e Biológicas',
    'Ciências Económicas e Jurídicas',
    'Ciências Humanas',
    'Artes Visuais'
  ],

  // Disciplinas
  disciplinas: [
    'Língua Portuguesa',
    'Matemática',
    'Física',
    'Química',
    'Biologia',
    'Geografia',
    'História',
    'Inglês',
    'Francês',
    'Educação Física',
    'Filosofia',
    'Sociologia'
  ],

  // Períodos
  periodos: ['Manhã', 'Tarde', 'Noite'],

  // Avisos gerais
  avisos: [
    {
      id: 1,
      titulo: 'Início do Ano Lectivo 2026/2025',
      conteudo: 'Informamos que o ano lectivo 2026/2025 terá início no dia 4 de Fevereiro de 2026. Todos os alunos devem comparecer devidamente uniformizados.',
      data: '2026-01-25',
      autor: 'Direcção',
      tipo: 'geral'
    },
    {
      id: 2,
      titulo: 'Reunião de Encarregados de Educação',
      conteudo: 'Convocam-se todos os encarregados de educação para uma reunião no dia 10 de Fevereiro de 2026, às 14h00, no anfiteatro da escola.',
      data: '2026-02-01',
      autor: 'Direcção Pedagógica',
      tipo: 'encarregados'
    },
    {
      id: 3,
      titulo: 'Entrega das Mini-Pautas do I Trimestre',
      conteudo: 'Lembra-se a todos os professores que a data limite para entrega das mini-pautas do I Trimestre é dia 30 de Abril de 2026.',
      data: '2026-04-15',
      autor: 'Secretaria Pedagógica',
      tipo: 'professores'
    },
    {
      id: 4,
      titulo: 'Provas Trimestrais',
      conteudo: 'As provas trimestrais do I Trimestre decorrerão de 22 a 26 de Abril de 2026. O calendário detalhado será afixado nos placards.',
      data: '2026-04-10',
      autor: 'Direcção Pedagógica',
      tipo: 'geral'
    }
  ],

  // Professor logado (simulação)
  professorLogado: {
    nome: 'João Manuel Ferreira',
    bi: '000123456LA789',
    email: 'joao.ferreira@escola.med.ao',
    telefone: '+244 923 456 789',
    disciplinas: ['Matemática', 'Física'],
    turmas: [
      { classe: '7ª', turma: 'A', disciplina: 'Matemática' },
      { classe: '8ª', turma: 'B', disciplina: 'Matemática' },
      { classe: '7ª', turma: 'A', disciplina: 'Física' }
    ]
  },
  encarregadoLogado: {
    nome: 'Maria José Santos',
    bi: '001234567LA890',
    telefone: '+244 912 345 678',
    email: 'maria.santos@email.ao',
    educandos: [
      { nome: 'Ana Maria Santos', classe: '7ª', turma: 'A' },
      { nome: 'Pedro João Santos', classe: '7ª', turma: 'A' }
    ]
  },


const Utils = {
  /**
   * Formatar data para exibição
   */
  formatarData: function(dataString) {
    const data = new Date(dataString);
    const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
    return data.toLocaleDateString('pt-AO', opcoes);
  },

  /**
   * Formatar data curta
   */
  formatarDataCurta: function(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-AO');
  },

  /**
   * Calcular média trimestral
   */
  calcularMediaTrimestral: function(mac, npp, npt) {
    if (mac === null || npp === null || npt === null) return null;
    // Fórmula MED: MT = (MAC + NPP + NPT) / 3
    return Math.round((mac + npp + npt) / 3);
  },

  /**
   * Calcular média final
   */
  calcularMediaFinal: function(mt1, mt2, mt3) {
    if (mt1 === null || mt2 === null || mt3 === null) return null;
    // Fórmula MED: MF = (MT1 + MT2 + MT3) / 3
    return Math.round((mt1 + mt2 + mt3) / 3);
  },

  /**
   * Obter classe de cor para nota
   */
  getCorNota: function(nota) {
    if (nota === null) return '';
    if (nota >= 14) return 'text-success';
    if (nota >= 10) return 'text-warning';
    return 'text-danger';
  },

  /**
   * Validar nota (0-20)
   */
  validarNota: function(nota) {
    const valor = parseInt(nota);
    return !isNaN(valor) && valor >= 0 && valor <= 20;
  },

  /**
   * Mostrar notificação Toast
   */
  mostrarNotificacao: function(mensagem, tipo = 'info') {
    // Criar container se não existir
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container position-fixed top-0 end-0 p-3';
      container.style.zIndex = '1100';
      document.body.appendChild(container);
    }

    // Criar toast
    const toastId = 'toast-' + Date.now();
    const bgClass = {
      'success': 'bg-success',
      'danger': 'bg-danger',
      'warning': 'bg-warning',
      'info': 'bg-primary'
    }[tipo] || 'bg-primary';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">${mensagem}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new window.bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();

    // Remover após fechar
    toastElement.addEventListener('hidden.bs.toast', function() {
      toastElement.remove();
    });
  },

  /**
   * Confirmar ação
   */
  confirmar: function(mensagem) {
    return new Promise((resolve) => {
      // Usar modal Bootstrap para confirmação
      const modalId = 'confirm-modal-' + Date.now();
      const modalHtml = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirmação</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p>${mensagem}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="${modalId}-confirm">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const modalElement = document.getElementById(modalId);
      const modal = new window.bootstrap.Modal(modalElement);

      document.getElementById(`${modalId}-confirm`).addEventListener('click', function() {
        modal.hide();
        resolve(true);
      });

      modalElement.addEventListener('hidden.bs.modal', function() {
        modalElement.remove();
        resolve(false);
      });

      modal.show();
    });
  },

  /**
   * Obter ano lectivo atual
   */
  getAnoLectivo: function() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    // Ano lectivo começa em Fevereiro em Angola
    if (mes < 1) {
      return `${ano - 1}/${ano}`;
    }
    return `${ano}/${ano + 1}`;
  },

  /**
   * Debounce function
   */
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

/**
 * Inicialização quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips Bootstrap
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(function(tooltipTriggerEl) {
    new window.bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers Bootstrap
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach(function(popoverTriggerEl) {
    new window.bootstrap.Popover(popoverTriggerEl);
  });

  // Marcar link ativo na navegação
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
      link.classList.add('active');
    }
  });
});

// Exportar para uso global
window.DadosFicticios = DadosFicticios;
window.Utils = Utils;
