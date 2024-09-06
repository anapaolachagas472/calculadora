const aparelhosPorAmbiente = {
    sala: ['Televisão', 'Teclado Musical', 'Ventilador', 'Lâmpada'],
    cozinha: ['Geladeira', 'Micro-ondas', 'Fogão', 'Lâmpada', 'Bebedouro', 'Panela Elétrica de Arroz'],
    banheiro: ['Chuveiro', 'Secador de Cabelo', 'Lâmpada'],
    quarto: ['Televisão', 'Lâmpada', 'Notebook', 'Abajur', 'Carregador de celular'],
};

const bandeiraPrecos = {
    verde: 0.00,
    amarela: 0.04,
    'vermelha-1': 0.08,
    'vermelha-2': 0.10
};

// Atualiza as opções de aparelhos com base no ambiente selecionado
document.addEventListener('change', function(event) {
    if (event.target.matches('.ambiente-select')) {
        const ambiente = event.target.value;
        const aparelhoSelect = event.target.closest('.aparelho-container').querySelector('.aparelho-select');

        // Limpar as opções anteriores
        aparelhoSelect.innerHTML = '';

        // Adicionar as opções correspondentes ao ambiente selecionado
        aparelhosPorAmbiente[ambiente].forEach(aparelho => {
            const option = document.createElement('option');
            option.value = aparelho.toLowerCase().replace(/ /g, '-');
            option.textContent = aparelho;
            aparelhoSelect.appendChild(option);
        });
    }
});

// Função para adicionar um novo aparelho
document.getElementById('add-aparelho-btn').onclick = function() {
    const container = document.createElement('div');
    container.className = 'aparelho-container';

    container.innerHTML = `
        <div class="form-group">
            <label for="ambiente">Ambiente</label>
            <select class="ambiente-select">
                <option value="sala">Sala</option>
                <option value="cozinha">Cozinha</option>
                <option value="banheiro">Banheiro</option>
                <option value="quarto">Quarto</option>
            </select>
        </div>

        <div class="form-group">
            <label for="aparelho">Aparelho</label>
            <select class="aparelho-select">
                <!-- As opções serão preenchidas pelo JavaScript -->
            </select>
        </div>

        <div class="form-group">
            <label for="potencia">Potência (W)</label>
            <input type="number" class="potencia" placeholder="---">
        </div>

        <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input type="number" class="quantidade" value="1">
        </div>

        <div class="form-group">
            <label for="tempo">Tempo (horas)</label>
            <input type="number" class="tempo" value="24">
        </div>
    `;

    document.getElementById('form-aparelhos').appendChild(container);
};

// Função para calcular consumo e custo
document.getElementById('calcular-btn').onclick = function() {
    const containers = document.querySelectorAll('.aparelho-container');
    let totalConsumo = 0;

    containers.forEach(container => {
        const potencia = parseFloat(container.querySelector('.potencia').value);
        const quantidade = parseInt(container.querySelector('.quantidade').value);
        const tempo = parseFloat(container.querySelector('.tempo').value);

        if (!isNaN(potencia) && !isNaN(quantidade) && !isNaN(tempo)) {
            const energia = (potencia * quantidade * tempo) / 1000; // kWh
            totalConsumo += energia;
        }
    });

    const bandeira = document.getElementById('bandeira').value;
    const precoBandeira = bandeiraPrecos[bandeira] || 0;
    const custoKwh = parseFloat(document.getElementById('custo-kwh').value) || 0;
    const custoTotal = totalConsumo * (precoBandeira + custoKwh);

    document.getElementById('consumo').textContent = `Consumo estimado: ${totalConsumo.toFixed(2)} kWh`;
    document.getElementById('custo').textContent = `Custo estimado: R$ ${custoTotal.toFixed(2)}`;
};
