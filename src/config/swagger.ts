import swaggerJSDoc from 'swagger-jsdoc';

const apiUrl = process.env.API_URL || 'http://localhost:3000'; 

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'API de Produtores Rurais',
          version: '1.0.0',
          description: 'Documentação da API de Produtores Rurais',
        },
        servers: [
          {
            url: apiUrl,
            description: 'Servidor de Desenvolvimento',
          },
        ],
        components: {
          schemas: {
            Producer: {
              type: 'object',
              required: ['cpf_cnpj', 'nome', 'nome_fazenda', 'cidade', 'estado', 'area_total', 'area_agricultavel', 'area_vegetacao', 'culturas'],
              properties: {
                id: {
                  type: 'integer',
                  description: 'ID do produtor',
                },
                cpf_cnpj: {
                  type: 'string',
                  description: 'CPF ou CNPJ do produtor',
                },
                nome: {
                  type: 'string',
                  description: 'Nome do produtor',
                },
                nome_fazenda: {
                  type: 'string',
                  description: 'Nome da fazenda',
                },
                cidade: {
                  type: 'string',
                  description: 'Cidade da fazenda',
                },
                estado: {
                  type: 'string',
                  description: 'Estado da fazenda',
                },
                area_total: {
                  type: 'number',
                  description: 'Área total da fazenda (hectares)',
                },
                area_agricultavel: {
                  type: 'number',
                  description: 'Área agricultável da fazenda (hectares)',
                },
                area_vegetacao: {
                  type: 'number',
                  description: 'Área de vegetação da fazenda (hectares)',
                },
                culturas: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Culturas plantadas (Soja, Milho, Algodão, Café e Cana de Açúcar)',
                },
              },
            },
          },
        },
      },
  apis: ['./src/controllers/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
