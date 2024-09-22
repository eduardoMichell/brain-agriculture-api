import Database from '../src/config/database';

const seedProdutores = async () => {
  const db = new Database();

  const queryText = `
    INSERT INTO produtores (cpf_cnpj, nome, nome_fazenda, cidade, estado, area_total, area_agricultavel, area_vegetacao, culturas)
    VALUES 
    -- Produtores de Santa Catarina
    ('12345678901', 'Produtor 1', 'Fazenda Bela Vista', 'Florianópolis', 'SC', 500, 300, 200, ARRAY['Soja', 'Milho']),
    ('98765432100', 'Produtor 2', 'Fazenda Boa Esperança', 'Itajaí', 'SC', 800, 600, 200, ARRAY['Café', 'Cana de Açúcar']),
    ('11223344556', 'Produtor 3', 'Fazenda Recanto Verde', 'Blumenau', 'SC', 700, 450, 250, ARRAY['Milho', 'Algodão']),
    ('66778899001', 'Produtor 4', 'Fazenda Estrela do Sul', 'Joinville', 'SC', 1000, 700, 300, ARRAY['Soja', 'Café']),
    ('44556677889', 'Produtor 5', 'Fazenda Campo Limpo', 'Chapecó', 'SC', 1200, 800, 400, ARRAY['Milho', 'Cana de Açúcar']),
    ('99887766554', 'Produtor 6', 'Fazenda Pôr do Sol', 'Lages', 'SC', 1500, 1000, 500, ARRAY['Soja', 'Café']),
    ('33445566778', 'Produtor 7', 'Fazenda Alto Vale', 'Rio do Sul', 'SC', 600, 400, 200, ARRAY['Algodão', 'Café']),
    ('22334455661', 'Produtor 8', 'Fazenda Nova Esperança', 'São José', 'SC', 950, 600, 350, ARRAY['Soja', 'Café']),
    ('77889900123', 'Produtor 9', 'Fazenda Vida Nova', 'Tubarão', 'SC', 1100, 700, 400, ARRAY['Milho', 'Cana de Açúcar']),
    ('55667788900', 'Produtor 10', 'Fazenda Monte Alegre', 'Balneário Camboriú', 'SC', 850, 500, 350, ARRAY['Soja', 'Milho']),

    -- Produtores do Paraná
    ('23456789012', 'Produtor 11', 'Fazenda Verde Campo', 'Curitiba', 'PR', 900, 600, 300, ARRAY['Soja', 'Milho']),
    ('34567890123', 'Produtor 12', 'Fazenda Vale Feliz', 'Londrina', 'PR', 1000, 700, 300, ARRAY['Café', 'Cana de Açúcar']),
    ('45678901234', 'Produtor 13', 'Fazenda Horizonte Azul', 'Maringá', 'PR', 850, 550, 300, ARRAY['Milho', 'Soja']),
    ('56789012345', 'Produtor 14', 'Fazenda Boa Vista', 'Ponta Grossa', 'PR', 1200, 800, 400, ARRAY['Soja', 'Café']),
    ('67890123456', 'Produtor 15', 'Fazenda Recanto Alegre', 'Cascavel', 'PR', 950, 600, 350, ARRAY['Algodão', 'Milho']),
    ('78901234567', 'Produtor 16', 'Fazenda Novo Horizonte', 'Foz do Iguaçu', 'PR', 1050, 650, 400, ARRAY['Soja', 'Cana de Açúcar']),
    ('89012345678', 'Produtor 17', 'Fazenda Sol Nascente', 'Guarapuava', 'PR', 700, 500, 200, ARRAY['Milho', 'Algodão']),
    ('90123456789', 'Produtor 18', 'Fazenda Viver Bem', 'Paranavaí', 'PR', 1100, 700, 400, ARRAY['Soja', 'Café']),
    ('01234567890', 'Produtor 19', 'Fazenda Raio de Sol', 'Umuarama', 'PR', 1250, 900, 350, ARRAY['Café', 'Milho']),
    ('12345678912', 'Produtor 20', 'Fazenda Nova Vida', 'Campo Mourão', 'PR', 1300, 850, 450, ARRAY['Soja', 'Café']),

    -- Produtores do Rio Grande do Sul
    ('23456789123', 'Produtor 21', 'Fazenda Santa Clara', 'Porto Alegre', 'RS', 900, 600, 300, ARRAY['Soja', 'Milho']),
    ('34567891234', 'Produtor 22', 'Fazenda Vale Encantado', 'Caxias do Sul', 'RS', 850, 550, 300, ARRAY['Café', 'Cana de Açúcar']),
    ('45678912345', 'Produtor 23', 'Fazenda Esperança', 'Pelotas', 'RS', 800, 500, 300, ARRAY['Milho', 'Algodão']),
    ('56789123456', 'Produtor 24', 'Fazenda Recanto da Paz', 'Santa Maria', 'RS', 1100, 700, 400, ARRAY['Soja', 'Café']),
    ('67891234567', 'Produtor 25', 'Fazenda Três Marias', 'Novo Hamburgo', 'RS', 1200, 850, 350, ARRAY['Milho', 'Cana de Açúcar']),
    ('78912345678', 'Produtor 26', 'Fazenda Estrela do Sul', 'Passo Fundo', 'RS', 950, 600, 350, ARRAY['Soja', 'Café']),
    ('89013456789', 'Produtor 27', 'Fazenda Campo Verde', 'Canoas', 'RS', 1050, 700, 350, ARRAY['Milho', 'Algodão']),
    ('90124567890', 'Produtor 28', 'Fazenda Vale Verde', 'Gravataí', 'RS', 1100, 750, 350, ARRAY['Soja', 'Café']),
    ('01235678901', 'Produtor 29', 'Fazenda Vida Nova', 'Viamão', 'RS', 1250, 850, 400, ARRAY['Café', 'Milho']),
    ('12346789012', 'Produtor 30', 'Fazenda Raio de Luz', 'Rio Grande', 'RS', 1300, 900, 400, ARRAY['Soja', 'Café']);
  `;

  try {
    await db.query(queryText);
    console.log('Seed de produtores inserido com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar seed de produtores:', err);
  }
};

seedProdutores();