import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailtrapMailProvider from './implementations/MailtrapMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: EtherealMailProvider,
  mailtrap: MailtrapMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
