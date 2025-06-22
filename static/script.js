let periodo = 3



function verificar_email() {
    const email = document.getElementById('email-content');
    const email_content = String(email.value);
    const idx_arroba = email_content.indexOf('@')
    const idx_ponto = email_content.indexOf('.')
    if (idx_arroba < 1 || idx_ponto <= (idx_arroba + 1) || idx_ponto === email_content.length - 1) {
        email.classList.add("form-error")
        document.querySelector('.submit-edit').style.display = 'none';
    } else {
        email.classList.remove("form-error");
        document.querySelector('.submit-edit').style.display = 'initial';
    } 
}

function verificar_cpf() {
    const cpf = document.getElementById('cpf-content');
    const cpf_content = cpf.value;

    // verifica o traço no final
    if (cpf_content[cpf_content.length - 3] === '-') {
        cpf.classList.remove("form-error");
        document.querySelector('.submit-edit').style.display = 'initial';
    } else {
        cpf.classList.add("form-error");
        document.querySelector('.submit-edit').style.display = 'none';
    } 

    // verifica se tem ponto
    if (cpf_content.includes('.')) {
        for (let i = 0; i < cpf_content.length; i++) {
            // verifica a posição dos pontos
            if (cpf_content[i] === '.') {
                if ((i + 1) % 4 != 0 && i < 8) {
                    cpf.classList.add("form-error");
                    document.querySelector('.submit-edit').style.display = 'none';
                } else {
                    cpf.classList.remove("form-error");
                    document.querySelector('.submit-edit').style.display = 'initial';
                } 
            }

            // verifica se há outro caractere que não numérico
            if (!'.-0123456789'.includes(cpf_content[i])) {
                cpf.classList.add("form-error");
                document.querySelector('.submit-edit').style.display = 'none';
            }
        }
    } else {
        cpf.classList.add("form-error");
        document.querySelector('.submit-edit').style.display = 'none';
    } 
}

function adicionar_periodo() {
    // Pegando valores
    const uc1 = prompt("Insira a Unidade Curricular 1");
    const uc2 = prompt("Insira a Unidade Curricular 2");

    // Identificando a tabela
    const table = document.querySelector('tbody');

    // Criando linha
    const new_tr = document.createElement('tr');

    // Adicionando valores
    periodo += 1;
    const periodo_data = document.createElement('td');
    periodo_data.textContent = periodo + 'º'
    new_tr.appendChild(periodo_data); 
    const uc1_data = document.createElement('td');
    uc1_data.textContent = uc1;
    new_tr.appendChild(uc1_data);
    const uc2_data = document.createElement('td');
    uc2_data.textContent = uc2;
    new_tr.appendChild(uc2_data);

    // Adicionando botões para ordenar
    const controle_td = document.createElement('td');
    controle_td.innerHTML = `
    <button onclick="mudar_ordem(this, -1)">▲</button>
    <button onclick="mudar_ordem(this, 1)">▼</button>
    `;
    new_tr.appendChild(controle_td);

    // Adicionando linha
    table.appendChild(new_tr);
}

function editar_info_pessoal() {
    document.querySelector('.popup-form-edit').style.display = 'flex';
}

function add_descricao() {
    document.querySelector('.popup-form-add').style.display = 'flex';
}

function fechar_popup() {
    document.querySelector('.popup-form-edit').style.display = 'none';
    document.querySelector('.popup-form-add').style.display = 'none';
}

function submit_edit(event) {
    event.preventDefault();
    const cpf = document.querySelector('#cpf');
    const email = document.querySelector('#email');
    const cpf_content = 'CPF: ' + document.querySelector('#cpf-content').value;
    const email_content = 'Email: ' + document.querySelector('#email-content').value;
    
    cpf.textContent = cpf_content;
    email.textContent = email_content;
    document.querySelector('.popup-form-edit').style.display = 'none';
}

function submit_add(event) {
    event.preventDefault(); 
    const s2_description = document.querySelector('.s2-description');
    const p = document.createElement('p');
    const hr = document.createElement('hr');
    const description_content = document.querySelector('#description-content').value;

    p.textContent = description_content;
    s2_description.appendChild(hr);
    s2_description.appendChild(p);
    document.querySelector('.popup-form-add').style.display = 'none';
    
}

function mudar_ordem(button, direction) {
    const row = button.closest('tr');
    const tbody = row.parentElement;
    const rows = Array.from(tbody.children);
    const row_idx = rows.indexOf(row);
    const new_idx = row_idx + direction;

    if (new_idx >= 0 && new_idx < rows.length) {
        const target = rows[new_idx];
        if (direction === -1) {
            tbody.insertBefore(row, target);
        } else {
            tbody.insertBefore(target, row);
        }
    }
}