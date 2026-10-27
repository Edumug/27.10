/*Controle de consumo de água


Uma companhia de abastecimento deseja incentivar o consumo consciente.
O valor cobrado é de R$ 3 por metro cúbico para os primeiros 10 m³, R$ 5 para os próximos 10 m³ e R$ 8 para o consumo que ultrapassar 20 m³.
O sistema deverá calcular o valor da conta considerando o consumo em cada faixa e identificar consumidores que ultrapassaram 30 m³, classificando-os como consumo elevado.*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/calcular/:consumo', (req, res) => {
    const consumo = parseInt(req.params.consumo);
    if (isNaN(consumo) || consumo < 0) {
        return res.status(400).send('Consumo inválido');
    }

    let valor = 0;

    if (consumo <= 10) {
        valor = consumo * 3;
    } else if (consumo <= 20) {
        valor = 10 * 3 + (consumo - 10) * 5;
    } else {
        valor = 10 * 3 + 10 * 5 + (consumo - 20) * 8;
    }

    const classificacao = consumo > 30 ? 'Consumo elevado' : 'Consumo normal';

    res.send(`Valor a pagar: R$ ${valor}. Classificação: ${classificacao}`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
