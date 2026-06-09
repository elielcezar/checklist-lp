// Conteúdo extraído do design Figma (Checklist LP Assaí). Gerado automaticamente.
const CATEGORIES = [
  {
    "id": "mini",
    "name": "MINI MERCADOS, MERCEARIAS E EMPÓRIOS",
    "image": "assets/img/cat-mini-mercados.png",
    "cover": "assets/img/cover-minimercado.jpg",
    "sections": [
      {
        "subtitle": "Bebidas, Gelos e Destilados",
        "items": [
          {
            "title": "Cervejas (Lata, Latão e Long Neck)",
            "desc": "Marcas Pilsen, Puro Malte, Duplo Malte e versões Zero Álcool.",
            "tip": "Monte ilhas centrais na entrada e dobre o espaço de geladeiras na véspera dos jogos."
          },
          {
            "title": "Refrigerantes (Pet de 2L / 2.5L e Latas)",
            "desc": "Sabores Cola, Guaraná, Laranja, Limão e versões Zero Açúcar.",
            "tip": "Foque no tamanho família para os almoços e reuniões de torcedores."
          },
          {
            "title": "Gelo Filtrado (Cubo e Moído)",
            "desc": "Sacos de 5kg e 10kg.",
            "tip": "É o item mais esquecido pelos clientes. Posicione os freezers colados nas bebidas."
          },
          {
            "title": "Destilados e Coquetéis Prontos",
            "desc": "Vodka, Cachaça, Gin, Rum e latas de drinks prontos.",
            "tip": "Mantenha em gôndola bem visível perto do balcão de atendimento para estimular a compra por impulso."
          },
          {
            "title": "Sucos, Isotônicos e Energéticos",
            "desc": "Caixas de 1L, garrafas de isotônicos e latas de energético.",
            "tip": "Perfeitos para misturas com destilados e para a manhã seguinte aos jogos."
          }
        ]
      },
      {
        "subtitle": "Salgadinhos, Snacks e Mercearia",
        "items": [
          {
            "title": "Salgadinhos de Pacote e Batata Chips",
            "desc": "Tamanhos grandes (100g a 200g) nos sabores queijo, churrasco e natural.",
            "tip": "Crie uma seção especial combinando os salgadinhos diretamente com o setor de cervejas."
          },
          {
            "title": "Amendoins e Castanhas",
            "desc": "Amendoim japonês, salgado sem pele, com casca torrado e ovinhos de amendoim.",
            "tip": "Foque no tamanho família para os almoços e reuniões de torcedores."
          },
          {
            "title": "Milho de Pipoca e Pipocas de Micro-ondas",
            "desc": "Grãos premium e pacotes de micro-ondas (manteiga e bacon).",
            "tip": "Destaque como o petisco mais econômico para as famílias assistirem aos jogos da tarde."
          },
          {
            "title": "Doces Juninos em Potes",
            "desc": "Paçocas rolha, pés de moleque, doces de abóbora e canjicas prontas.",
            "tip": "Coloque em cima do balcão do caixa para o cliente pegar na hora de pagar."
          },
          {
            "title": "Biscoitos Salgados e Torradas",
            "desc": "Biscoitos de polvilho, snacks de trigo e torradas para patês.",
            "tip": "Posicione perto da seção de frios e queijos cremosos."
          }
        ]
      },
      {
        "subtitle": "Mais ingredientes para o seu checklist",
        "items": [
          {
            "title": "Carvão Vegetal e Acendedores",
            "desc": "Pacotes de 3kg a 5kg. Item essencial de reposição rápida para churrascos de última hora em casa.",
            "tip": null
          },
          {
            "title": "Copos e Pratos Descartáveis (Verde e Amarelo)",
            "desc": "Kits de utensílios para festas. O torcedor compra para evitar lavar louça durante as comemorações.",
            "tip": null
          },
          {
            "title": "Ingredientes para Maionese Caseira e Patês",
            "desc": "Óleo de soja, ovos, caixas de creme de leite, sachês de maionese, mostarda e latas de atum/sardinha.",
            "tip": null
          },
          {
            "title": "Queijos Inteiros e Frios Fatiados",
            "desc": "Peças de queijo prato, muçarela, presunto e salame para tábuas rápidas de petisco.",
            "tip": null
          }
        ]
      }
    ]
  },
  {
    "id": "bares",
    "name": "BARES, BOTECOS, RESTAURANTES E ESPETARIAS",
    "image": "assets/img/cat-bares.png",
    "cover": "assets/img/cover-bares.jpg",
    "sections": [
      {
        "subtitle": "Proteínas, Embutidos e Petiscos de Estufa",
        "items": [
          {
            "title": "Linguiça Calabresa Defumada e Paio",
            "desc": "Pacotes industriais e caixas fechadas.",
            "tip": "Base para porções aceboladas de balcão e caldos quentes servidos no fim de tarde."
          },
          {
            "title": "Bacon Industrial (Manta e Cubos)",
            "desc": "Cortes com bom equilíbrio de gordura e carne para alta fritura.",
            "tip": "Essencial para finalizar porções de batata frita, caldos juninos e espetinhos."
          },
          {
            "title": "Carne de Sol, Charque e Cupim",
            "desc": "Cortes salgados ou congelados em porções institucionais.",
            "tip": "Crie uma tábua de petiscos servindo a carne desfiada acompanhada de macaxeira frita."
          },
          {
            "title": "Asinhas, Coxinhas da Asa e Frango Passarinho",
            "desc": "Cortes congelados em sacos de 3kg a 5kg.",
            "tip": "Mantenha as proteínas marinadas ou pré-fritas. O pedido não pode demorar mais de 7 minutos para chegar à mesa."
          },
          {
            "title": "Carne Moída e Cubos (Patinho, Coxão Mole e Acém)",
            "desc": "Embalagens com pesagem comercial.",
            "tip": "Ideal para bolinhos de carne, pastéis fritos na hora e salgados de estufa."
          }
        ]
      },
      {
        "subtitle": "Acompanhamentos, Óleos, Molhos e Hortifrúti",
        "items": [
          {
            "title": "Batata e Mandioca Congelada (Palito, Rústica e Anéis de Cebola)",
            "desc": "Sacos industriais pré-fatiados.",
            "tip": "Garante o mesmo padrão em todos os pratos, evita desperdício com cascas e rende mais."
          },
          {
            "title": "Óleo de Soja, Algodão ou Palma",
            "desc": "Caixas fechadas de óleo de cozinha.",
            "tip": "Estoque crítico. O uso das fritadeiras dobra durante os dias de jogos."
          },
          {
            "title": "Queijo Coalho e Queijo Provolone",
            "desc": "Peças inteiras para corte e porcionamento.",
            "tip": "Sirva o Queijo Coalho grelhado com melaço de cana como opção especial no cardápio."
          },
          {
            "title": "Cebola, Alho, Limão, Maracujá e Tomate",
            "desc": "Insumos frescos comprados em caixas ou sacos.",
            "tip": "Deixe os limões e frutas das caipirinhas cortados e higienizados horas antes do jogo começar."
          },
          {
            "title": "Condimentos (Maionese, Ketchup, Mostarda e Pimenta)",
            "desc": "Galões industriais de 3kg ou bisnagas.",
            "tip": "Abasteça todas as mesas e galheteiras antes de abrir as portas do estabelecimento."
          }
        ]
      },
      {
        "subtitle": "Mais ingredientes para o seu checklist",
        "items": [
          {
            "title": "Corações de Frango e Espetinhos Prontos",
            "desc": "Pacotes congelados. Ideais para assar rápido na churrasqueira ou chapa e servir como petisco individual de balcão.",
            "tip": null
          },
          {
            "title": "Caldos e Cremes Iniciais",
            "desc": "Sacos de milho verde desgranado, pacotes de macaxeira cozida e caixas de leite para caldos juninos de caneca.",
            "tip": null
          },
          {
            "title": "Xaropes e Frutas Congeladas para Drinks",
            "desc": "Polpas de frutas tropicais e xaropes saborizados. Bebidas visuais (como o \"drink verde e amarelo\") dominam as fotos dos clientes nas redes sociais.",
            "tip": null
          },
          {
            "title": "Farinhas e Farofas Prontas",
            "desc": "Sacos de farinha de mandioca torrada, farinha de milho e panko para empanados de alto padrão.",
            "tip": null
          }
        ]
      }
    ]
  },
  {
    "id": "confeiteiros",
    "name": "CONFEITEIROS, DOCEIROS E BOLEIROS",
    "image": "assets/img/cat-confeiteiros.png",
    "cover": "assets/img/cover-confeiteiros.jpg",
    "sections": [
      {
        "subtitle": "Laticínios e Insumos Base",
        "items": [
          {
            "title": "Leite Condensado (Fardos ou Bags Industriais)",
            "desc": "Versões integral ou semidesnatado para o ponto correto.",
            "tip": "É o ingrediente mais usado no seu dia a dia. Comprar em fardo fechado garante maior margem de lucro."
          },
          {
            "title": "Creme de Leite (Caixas de 200g ou Embalagens de 1kg)",
            "desc": "Teor de gordura ideal para cremosidade.",
            "tip": "Essencial para dar o ponto exato em ganaches, mousses e recheios de bolos de pote."
          },
          {
            "title": "Chantilly UHT (Caixas de 1L)",
            "desc": "Cremes para bater de alta estabilidade.",
            "tip": "Deixe as caixas na geladeira por pelo menos 12 horas antes de bater para dar o ponto firme de bico."
          },
          {
            "title": "Manteiga Sem Sal e Margarina Culinária (80% Lipídios)",
            "desc": "Potes industriais ou tabletes.",
            "tip": "Evita que os docinhos cristalizem rápido e garante o brilho dos brigadeiros."
          },
          {
            "title": "Leite em Pó Integral",
            "desc": "Pacotes de marcas líderes.",
            "tip": "Base para massas de doces finos e para decorações peneiradas em cima dos bolos."
          }
        ]
      },
      {
        "subtitle": "Secos, Confeitos e Embalagens",
        "items": [
          {
            "title": "Farinha de Trigo Tradicional (Sem Fermento)",
            "desc": "Sacos de 1kg ou 5kg de alta pureza.",
            "tip": "Matéria-prima essencial para massas de pão de ló, bolos caseiros e tortas."
          },
          {
            "title": "Açúcar Refinado, Cristal e de Confeiteiro",
            "desc": "Fardos fechados.",
            "tip": "Estoque crítico para produção de caldas, doces caramelizados e finalizações."
          },
          {
            "title": "Paçoca Rolha, Amendoim Moído e Xerém",
            "desc": "Sacos de quilo na seção de mercearia.",
            "tip": "Monte bolos de pote mesclando bolo de fubá com brigadeiro cremoso de paçoca."
          },
          {
            "title": "Chocolate em Barra (Nobre e Fracionado) e Confeitos",
            "desc": "Versões Meio Amargo, Ao Leite e Chocolate Branco.",
            "tip": "Use chocolate branco tingido com corante verde e amarelo para cobrir e decorar doces."
          },
          {
            "title": "Coco Ralado e Leite de Coco",
            "desc": "Sacos industriais de 1kg e garrafas de leite de coco.",
            "tip": "Indispensável para cocadas cremosas, beijinhos e bolos juninos de milho."
          },
          {
            "title": "Embalagens Plásticas, Potes de Delivery e Forminhas",
            "desc": "Potes com tampas firmes e caixas de transporte.",
            "tip": "Evita acidentes nas entregas de delivery feitas por motoboys minutos antes do jogo."
          }
        ]
      },
      {
        "subtitle": "Mais ingredientes para o seu checklist",
        "items": [
          {
            "title": "Corantes Alimentícios (Líquido e Gel)",
            "desc": "Tubos de corante nas tonalidades verde folha, amarelo gema e azul anil para massas e coberturas temáticas.",
            "tip": null
          },
          {
            "title": "Fubá Mimoso e Milho para Canjica",
            "desc": "Sacos de grãos e farinhas finas para bolos rústicos caseiros e potes de canjica/curau gourmet.",
            "tip": null
          },
          {
            "title": "Essências e Aromas Concentrados",
            "desc": "Baunilha, coco e amendoim para realçar o sabor de doces produzidos em grande escala.",
            "tip": null
          },
          {
            "title": "Fitas e Adereços Juninos/Futebol",
            "desc": "Fitas de cetim verde/amarela e mini bandeirinhas para decorar as embalagens e agregar valor na entrega.",
            "tip": null
          }
        ]
      }
    ]
  },
  {
    "id": "pizzarias",
    "name": "PIZZARIAS (MESA, BALCÃO E DELIVERY)",
    "image": "assets/img/cat-pizzarias.png",
    "cover": "assets/img/cover-pizzarias.jpg",
    "sections": [
      {
        "subtitle": "Queijos, Embutidos e Coberturas",
        "items": [
          {
            "title": "Queijo Muçarela (Peças Grandes de 3kg a 4kg)",
            "desc": "O item principal do seu custo.",
            "tip": "Compre em caixas fechadas no Assaí. Rale na véspera do jogo para agilizar a montagem das pizzas na hora do pico."
          },
          {
            "title": "Linguiça Calabresa Defumada",
            "desc": "Pacotes de 2.5kg inteiras ou fatiadas.",
            "tip": "É o sabor mais vendido do país. Mantenha o corte padrão para garantir a qualidade visual."
          },
          {
            "title": "Requeijão Culinário (Bisnagas de 1.5kg)",
            "desc": "Coberturas cremosas resistentes ao calor do forno.",
            "tip": "Use para pizzas de frango com catupiry e para oferecer bordas recheadas, que aumentam o valor da venda."
          },
          {
            "title": "Frango Desfiado e Cozido (Congelado)",
            "desc": "Pacotes prontos industriais.",
            "tip": "Elimina o tempo gasto com cozimento e tempero do frango na pizzaria, agilizando o trabalho da equipe."
          },
          {
            "title": "Lombo Defumado, Bacon em Cubos e Presunto",
            "desc": "Peças industriais para fatiamento interno.",
            "tip": "Crie um sabor especial combinando lombo defumado, bacon e milho verde."
          }
        ]
      },
      {
        "subtitle": "Massas, Conservas e Embalagens",
        "items": [
          {
            "title": "Farinha de Trigo Especial (Tipo 00 ou Premium)",
            "desc": "Sacos de alta absorção para massas profissionais.",
            "tip": "Prepare e boleie a massa com antecedência para garantir uma textura leve e crocante."
          },
          {
            "title": "Extrato, Polpa de Tomate e Molhos Prontos",
            "desc": "Bags ou latas industriais.",
            "tip": "Tempere no atacado usando azeite, alho e orégano comprados em embalagens grandes."
          },
          {
            "title": "Azeitonas (Pretas e Verdes com ou sem caroço)",
            "desc": "Baldes plásticos em salmoura de 2kg a 5kg.",
            "tip": "Retire da água salgada apenas a quantidade que será usada na rodada de pedidos do dia."
          },
          {
            "title": "Milho Verde e Palmito em Conserva",
            "desc": "Latas grandes ou sachês de alta drenagem.",
            "tip": "O milho verde tem saída garantida pelas receitas típicas desta época do ano."
          },
          {
            "title": "Caixas de Pizza Oitavadas, Papel Alumínio e Lacres",
            "desc": "Tamanhos Brotinho, Média e Grande.",
            "tip": "Deixe pelo menos 150 caixas completamente montadas e empilhadas antes do jogo começar."
          },
          {
            "title": "Carne Seca Desfiada e Maçaricada",
            "desc": "Pacotes a vácuo. Pizza de carne seca com queijo coalho evoca a cultura junina e regional e se destaca nos apps.",
            "tip": null
          },
          {
            "title": "Cebola Roxa, Manjericão e Tomate Cereja (Hortifrúti)",
            "desc": "Temperos folhosos e frescos para finalização aromática após a saída do forno.",
            "tip": null
          },
          {
            "title": "Chocolate Forneável (Bisnagas)",
            "desc": "Versões de chocolate ao leite e chocolate branco para bordas doces e pizzas de sobremesa.",
            "tip": null
          }
        ]
      }
    ]
  },
  {
    "id": "vendedores",
    "name": "VENDEDORES AMBULANTES",
    "image": "assets/img/cat-vendedores.png",
    "cover": "assets/img/cover-ambulantes.jpg",
    "sections": [
      {
        "subtitle": "Bebidas Práticas para Caixa Térmica / Isopor",
        "items": [
          {
            "title": "Cervejas em Lata (269ml e 350ml)",
            "desc": "Marcas comerciais e premium trincando de geladas.",
            "tip": "Compre em fardos fechados no Assaí aproveitando os preços de atacado por quantidade."
          },
          {
            "title": "Refrigerantes em Lata",
            "desc": "Sabores tradicionais de cola, guaraná e limão.",
            "tip": "Latas ocupam menos espaço no gelo e gelam muito mais rápido do que garrafas plásticas ou de vidro."
          },
          {
            "title": "Água Mineral com e sem Gás (Garrafas de 500ml)",
            "desc": "Caixas fechadas.",
            "tip": "É um dos itens que traz melhor margem de lucro. Mantenha o estoque sempre abastecido no gelo."
          },
          {
            "title": "Água de Coco e Sucos em Caixinha",
            "desc": "Embalagens individuais com canudinho.",
            "tip": "Excelente opção para atender as crianças que acompanham as famílias nas transmissões de rua."
          }
        ]
      },
      {
        "subtitle": "Pipoca, Doces e Descartáveis de Rua",
        "items": [
          {
            "title": "Milho de Pipoca Premium",
            "desc": "Grãos selecionados com alto rendimento e estouro.",
            "tip": "O cheiro da pipoca quentinha na rua funciona como um chamariz para atrair clientes de longe."
          },
          {
            "title": "Óleo de Soja e Caldo de Bacon em Tabletes",
            "desc": "Insumos para fritura e aroma.",
            "tip": "Estoure a pipoca salgada adicionando um toque de caldo de bacon no óleo quente para deixar um aroma irresistível na praça."
          },
          {
            "title": "Queijo Ralado, Sal e Manteiga de Garrafa",
            "desc": "Condimentos para finalização.",
            "tip": "Valorize seu produto oferecendo a manteiga de garrafa regional como um diferencial opcional."
          },
          {
            "title": "Doces Juninos Embalados Individualmente",
            "desc": "Paçocas em sachê, pés de moleque rígidos e bananadas.",
            "tip": "Ótimos para vender de forma casada com as bebidas ou para facilitar o troco em dinheiro."
          },
          {
            "title": "Copos Descartáveis, Guardanapos e Sacos de Pipoca",
            "desc": "Pacotes fechados de plástico ou papel.",
            "tip": "Guarde os estoques de papel dentro de sacolas plásticas fechadas para não pegar umidade da rua ou do gelo."
          }
        ]
      },
      {
        "subtitle": "Mais ingredientes para o seu checklist",
        "items": [
          {
            "title": "Leite Condensado e Achocolatado Pó (Embalagens Médias)",
            "desc": "Para fazer coberturas doces rápidas para pipocas doces de rua.",
            "tip": null
          },
          {
            "title": "Gelo Moído Extra e Sal Grosso",
            "desc": "Sacos fechados no atacado para reabastecimento rápido das caixas térmicas durante o intervalo.",
            "tip": null
          },
          {
            "title": "Snacks Salgados Menores (Tipo Amendoim Pettiz)",
            "desc": "Pacotes de 30g a 50g. Itens baratos perfeitos para pendurar com fitas (clip strips) ao redor do carrinho ambulante.",
            "tip": null
          },
          {
            "title": "Sachês Individuais de Molho",
            "desc": "Maionese, ketchup e mostarda em caixas de sachês para fácil distribuição sem bagunça.",
            "tip": null
          }
        ]
      }
    ]
  },
  {
    "id": "padarias",
    "name": "PADARIAS E PANIFICADORAS",
    "image": "assets/img/cat-padarias.png",
    "cover": "assets/img/cover-padarias.jpg",
    "sections": [
      {
        "subtitle": "Panificação e Insumos de Cozinha",
        "items": [
          {
            "title": "Farinha de Trigo para Panificação (Sacos de 25kg ou 50kg)",
            "desc": "Farinha profissional para pão francês.",
            "tip": "Calcule uma produção pelo menos 30% maior de pão francês nos dias de jogos que caem perto do fim de semana."
          },
          {
            "title": "Fermento Biológico (Seco Instantâneo ou Fresco em Blocos)",
            "desc": "Insumos de crescimento estável.",
            "tip": "Mantenha o fermento fresco bem armazenado sob refrigeração para garantir a qualidade da massa."
          },
          {
            "title": "Melhoradores de Farinha e Reforçadores",
            "desc": "Aditivos para panificação industrial.",
            "tip": "Garante que o pão francês saia do forno com a casca crocante e o miolo bem macio."
          },
          {
            "title": "Pães Especiais (Hambúrguer, Hot Dog e Sírio)",
            "desc": "Fardos fechados de pães de forma ou produção própria embalada.",
            "tip": "Coloque em prateleiras de destaque na entrada. Quem vai fazer lanche em casa compra esses itens em grandes quantidades."
          },
          {
            "title": "Misturas Prontas para Bolos Caseiros",
            "desc": "Sabores Milho Cremoso, Fubá, Mandioca e Coco.",
            "tip": "Agiliza o trabalho da sua equipe. É só assar, colocar na embalagem transparente e vender direto no balcão."
          }
        ]
      },
      {
        "subtitle": "Frios, Embutidos e Utilidades de Última Hora",
        "items": [
          {
            "title": "Presunto Cozido e Queijo Prato/Muçarela (Peças Grandes)",
            "desc": "Peças inteiras para fatiamento no balcão.",
            "tip": "Monte bandejas prontas fatiadas de 200g no refrigerador de autoatendimento para evitar filas grandes no balcão de frios."
          },
          {
            "title": "Mortadela Defumada e Salame",
            "desc": "Embutidos inteiros para fatiamento interno.",
            "tip": "O sanduíche de mortadela na chapa com queijo derretido vende muito nas horas que antecedem as partidas."
          },
          {
            "title": "Salsicha para Cachorro-Quente (Pacotes de 3kg a 5kg)",
            "desc": "Proteína resfriada de alto giro.",
            "tip": "Ideal para a produção em lote de mini salgados assados e mini hot dogs para festas familiares sob encomenda."
          },
          {
            "title": "Manteiga com Sal e Requeijão Cremoso (Baldes Industriais)",
            "desc": "Insumos para uso na chapa do balcão e receitas de pães doces.",
            "tip": "Garante o sabor tradicional do pão na chapa que puxa o movimento do café da manhã."
          },
          {
            "title": "Carvão Vegetal e Acendedores Automáticos",
            "desc": "Sacos de 3kg a 5kg.",
            "tip": "Produto de altíssimo impulso comercial. Posicione os sacos de carvão do lado de fora da padaria ou bem perto do caixa."
          }
        ]
      },
      {
        "subtitle": "Mais ingredientes para o seu checklist",
        "items": [
          {
            "title": "Pão de Alho Pronto (Resfriado)",
            "desc": "Pacotes de marcas parceiras ou produção própria. É o acompanhamento mais comprado junto com o pão francês nos dias de churrasco da seleção.",
            "tip": null
          },
          {
            "title": "Maionese e Batata Palha em Sacos Grandes",
            "desc": "Insumos para o preparo e montagem rápida de cachorros-quentes na chapa do balcão.",
            "tip": null
          },
          {
            "title": "Creme de Leite e Canela em Pó",
            "desc": "Para a confecção de arroz doce e canjicas de potinho na estufa de doces da padaria.",
            "tip": null
          },
          {
            "title": "Massas Folhadas e Prontas (Salgados congelados)",
            "desc": "Croissants, mini coxinhas e kibe congelados para assar e servir em porções rápidas de balcão.",
            "tip": null
          }
        ]
      }
    ]
  }
];
