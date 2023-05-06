import { ConnectWallet } from '@proton/web-sdk';
import { PROTON_CHAIN } from '../constants/proton-chain.constant';
import ProtonVIPLogo from '../../util/proton-logo-color.png';
import firebaseService from './firebase.service';
import Link, { LinkSession } from '@proton/link';
import { User } from '../providers/AuthProvider';

interface Connect {
  restoreSession: boolean;
}

class ProtonSDK {
  public chainId: string;
  public endpoints: string[];
  public appName: string;
  public requestAccount: string;
  public session: LinkSession | null;
  public link?: Link | null;
  public user: User;
  public error: string;

  constructor() {
    this.chainId = PROTON_CHAIN.chainId;
    this.endpoints = PROTON_CHAIN.endpoints;
    this.appName = PROTON_CHAIN.appName;
    this.requestAccount = PROTON_CHAIN.requestAccount;
    this.session = null;
    this.link = null;
    this.user = {
      actor: '',
      permission: '',
      avatar: '',
      createdAt: new Date(),
      name: '',
      isMember: false,
      memberLevel: '',
    };
    this.error = ''
  }

  connect = async ({ restoreSession }: Connect) => {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        chainId: this.chainId,
        endpoints: this.endpoints,
        restoreSession,
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true,
      },
      selectorOptions: {
        appName: this.appName,
        appLogo: ProtonVIPLogo,
      },
    });
    this.link = link;
    this.session = session;
    return session;
  };

  login = async () => {
    try {
      const session = await this.connect({ restoreSession: false });
      this.user = this._returnUserFromSession(session);
      return { user: this.user };
    } catch (e) {
      return { error: e.message || "An error has occurred while logging in"};
    }
  };

  sendTransaction = async (amount: number, level: string) => {
    const actions = [
      {
        account: 'xtokens',
        name: 'transfer',
        authorization: [
          {
            actor: this.user.actor,
            permission: this.user.permission,
          },
        ],
        data: {
          from: this.user.actor,
          to: this.requestAccount,
          quantity: `${amount}.000000 FOOBAR`,
          memo: 'ProtonVIP',
        },
      },
    ];

    try {
      if (!this.session) {
        return;
      }
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      await firebaseService.collection('members').add({
        user: this.user.actor,
        level,
      });

      return { id: result.processed?.id };
    } catch (e) {
      return { error: e.message || "An error has occurred while sending a transaction"};
    }
  };

  logout = async () => {
    if (!this.session && !this.link) {
      return;
    }

    await this.link!.removeSession(this.appName, this.session!.auth);
    localStorage.removeItem('AUTH_USER_PROTON_VIP');
  };

  restoreSession = async () => {
    const token: string = localStorage.getItem('AUTH_USER_PROTON_VIP') || '';
    const savedUserAuth = JSON.parse(token);
    if (savedUserAuth) {
      try {
        const session = await this.connect({ restoreSession: true });
        if (session) {
          this.user = this._returnUserFromSession(this.session);
          return this.user;
        }
      } catch (e) {
        return { error: e.message || "An error has occurred while restoring a session"};
      }
    }
    return null;
  };

  _returnUserFromSession = (session: any) => {
    const auth = session.auth;
    const profile = session.accountData ? session.accountData[0] : {
      name: '',
      acc: auth.actor,
      avatar: '',
    };

    const user = {
      actor: auth.actor,
      permission: auth.permission,
      avatar: profile.avatar,
      createdAt: profile.date,
      name: profile.name,
    };
    return user;
  };
}

const ProtonService = new ProtonSDK();
export default ProtonService;
