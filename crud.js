/*Estacionamento inteligente


Um estacionamento cobra R$ 8 pela primeira hora e R$ 5 por cada hora adicional iniciada.
O proprietário deseja um sistema capaz de calcular o valor devido por um motorista com base no tempo de permanência.
Qualquer fração de hora adicional será cobrada como uma hora completa. Por exemplo, um veículo estacionado durante 2 horas e 15 minutos deverá pagar por 3 horas.*/

const express = require('express');
const app = express();
const port = 3000;


app.get('/calcular/:tempo', (req, res) => {
    const tempo = parseInt(req.params.tempo);
    if (isNaN(tempo) || tempo < 0) {
        return res.status(400).send('Tempo inválido');
    }

    const horas = Math.ceil(tempo / 60);
    let valor = 0;

    if (horas === 1) {
        valor = 8;
    } else if (horas > 1) {
        valor = 8 + (horas - 1) * 5;
    }

    res.send(`Valor a pagar: R$ ${valor}`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
