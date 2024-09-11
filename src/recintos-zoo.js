class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', espacoTotal: 10, espacoOcupado: 5 },
            { numero: 2, bioma: 'floresta', espacoTotal: 5, espacoOcupado: 2 },
            { numero: 3, bioma: 'savana e rio', espacoTotal: 7, espacoOcupado: 2 },
            { numero: 4, bioma: 'rio', espacoTotal: 8, espacoOcupado: 3 },
            { numero: 5, bioma: 'savana', espacoTotal: 9, espacoOcupado: 3 },
        ];

        this.atualizarRecintosDisponiveis();
    }

    atualizarRecintosDisponiveis() {
        this.recintosDisponiveis = this.recintos.map((recinto) => ({
            ...recinto,
            espacoLivre: recinto.espacoTotal - recinto.espacoOcupado,
        }));
    }

    analisaRecintos(animal, quantidade) {
        const animais = {
            leao: { tamanho: 3 },
            leopardo: { tamanho: 2 },
            crocodilo: { tamanho: 1 },
            macaco: { tamanho: 1 },
            gazela: { tamanho: 2 },
            hipopotamo: { tamanho: 4 }
        };

        const infoAnimal = animais[animal.toLowerCase()];

        if (!infoAnimal) {
            return {
                erro: 'Animal inválido',
                recintosViaveis: false
            };
        }

        if (quantidade <= 0) {
            return {
                erro: 'Quantidade inválida',
                recintosViaveis: false
            };
        }

        const tamanhoAnimal = infoAnimal.tamanho;
        const espacoNecessario = tamanhoAnimal * quantidade;

        let recintosViaveis;

        switch (animal.toLowerCase()) {

            case 'leao':
                
                recintosViaveis = this.recintosDisponiveis
                    .filter(r => r.numero === 5 && r.espacoLivre >= espacoNecessario)
                    .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                break;

            case 'crocodilo':
                recintosViaveis = this.recintosDisponiveis
                    .filter(r => r.numero === 4 && r.espacoLivre >= espacoNecessario)
                    .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                break;

            case 'macaco':
                recintosViaveis = this.recintosDisponiveis
                    .filter(r => [1, 2].includes(r.numero) && r.espacoLivre >= espacoNecessario)
                    .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                break;
           
            case 'gazela':
                recintosViaveis = this.recintosDisponiveis
                    .filter(r => [1, 3].includes(r.numero) && r.espacoLivre > espacoNecessario)
                    .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                break;

                case 'hipopotamo':
                    recintosViaveis = this.recintosDisponiveis
                        .filter(r => [3].includes(r.numero) && r.espacoLivre >= espacoNecessario)
                        .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                    break;
             
            case 'leopardo':
                
            recintosViaveis = this.recintosDisponiveis
                .filter(r => r.numero === 0 && r.espacoLivre >= espacoNecessario)
                .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
            break;

            default:
                recintosViaveis = this.recintosDisponiveis
                    .filter(r => r.espacoLivre >= espacoNecessario)
                    .sort((a, b) => a.espacoLivre - b.espacoLivre)
                    .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);
                break;
        }

        if (recintosViaveis.length === 0) {
            return {
                erro: 'Não há recinto viável',
                recintosViaveis: false
            };
        }

        return {
            erro: false,
            recintosViaveis
        };
    }
}

export { RecintosZoo };
