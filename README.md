# Recuperação de senha

**Requisitos funcionais**
- o usuário deve poder recuperar sua senha informando o e-mail;
- o usuário deve receber um e-mail com instruções de recuperação de senha;
- o usuário deve poder resetar sua senha;

**Requisitos não funcionais**
- utilizar o mailtrap para testar envios em ambiente de desenvolvimento;
- utilizar o Amazon SES para os envios em produção;
- o envio de e-mails deve acontecer em segundo plano (background job);

**Regras de negócio**
- o link enviado por email para resetar senha, deve expirar em 2h;
- o usuário precisa confirmar a nova senha no momento de resetar a senha;

# Atualização do perfil

**Requisitos funcionais**
- o usuário deve poder atualizar seu nome, emial e senha;

**Requisitos não funcionais**
- NON

**Regras de negócio**
- o usuário não pode alterar o e-mail para um e-mail já utilizado;
- para atualizar sua senha, o usuário deve informar a senha antiga;
- para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**Requisitos funcionais**
- o usuário deve poder listar seus agendamentos de um dia especifico;
- o prestador deve receber uma notificação sempre que houver um novo agendamento;
- o prestador deve poder visualizar as notificações não lidas;

**Requisitos não funcionais**
- os agendamentos do prestador no dia devem ser armazenados em cache;
- as notificações do prestador devem ser armazenadas no MongoDB;
- as notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de negócio**
- a notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos funcionais**
- o usuário deve poder listar todos os prestadores de serviço cadastrados;
- o usuário deve poder listdar todods os dias de um mês com pelo menos um horário disponível de um prestador;
- o usuário deve poder listar horário disponíveis em um dia específico de um prestador;
- o usuário deve poder realizr um novo agendamento com um prestador;

**Requisitos não funcionais**
- a listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**
- cada agendamento deve durar 1h exatamente;
- os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h e último às 17h);
- o usuário não pode agendar em um horário já ocupado;
- o usuário não pode agendar em um horário que já passou;
- o usuário não pode agendar serviços consigo mesmo;
