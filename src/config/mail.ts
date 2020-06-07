interface IMailConfig {
  driver: 'ses' | 'mailtrap' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.APP_MAIL_DRIVER || 'mailtrap',

  defaults: {
    from: {
      name: process.env.APP_MAIL_FROM_NAME || 'Equipe GoBarber',
      email: process.env.APP_MAIL_FROM_EMAIL || 'contato@gobarber.com.br',
    },
  },
} as IMailConfig;
