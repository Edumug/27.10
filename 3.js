/*Controle de acesso

Uma empresa possui uma área restrita que somente pode ser acessada por funcionários autorizados.
Cada funcionário possui um código de identificação e uma senha. O sistema deverá verificar as credenciais e informar se o acesso foi autorizado.
Após três tentativas consecutivas incorretas, o acesso daquele funcionário deverá ser bloqueado. Um administrador deverá conseguir desbloquear funcionários.*/

const express = require('express');
const app = express();
const port = 3000;

const funcionarios = [
    { id: 1, senha: '123', tentativas: 0, bloqueado: false },
    { id: 2, senha: '456', tentativas: 0, bloqueado: false },
    { id: 3, senha: '789', tentativas: 0, bloqueado: false }
];

app.use(express.json());

app.post('/acesso', (req, res) => {
    const { id, senha } = req.body;
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado');
    }

    if (funcionario.bloqueado) {
        return res.status(403).send('Acesso bloqueado');
    }

    if (funcionario.senha === senha) {
        funcionario.tentativas = 0;
        return res.send('Acesso autorizado');
    } else {
        funcionario.tentativas++;
        if (funcionario.tentativas >= 3) {
            funcionario.bloqueado = true;
        }
        return res.status(401).send('Acesso negado');
    }
});

app.post('/desbloquear/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
        return res.status(404).send('Funcionário não encontrado');
    }

    funcionario.bloqueado = false;
    funcionario.tentativas = 0;
    res.send('Funcionário desbloqueado');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
