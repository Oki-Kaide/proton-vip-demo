export const AMANDA_DATA = {
  firstName: 'Amanda',
  lastName: 'Montgomery',
  title: 'Country Star / Song Writer',
  priceLevels: [
    {
      title: 'Patron',
      id: 'patron',
      cost: 10,
      description:
        'Dedicated coaching and support for established creators and creative businesses, plus premium features that save time and reward your patrons.',
      list: ['Private chatroom', 'Exclusive videos', 'Song lyrics'],
      popular: false,
    },
    {
      title: 'VIP',
      id: 'vip',
      cost: 20,
      description:
        'Dedicated coaching and support for established creators and creative businesses, plus premium features that save time and reward your patrons.',
      list: [
        'All the benefits of Patron Level',
        'Exclusive live streams',
        'Sticker pack',
      ],
      popular: true,
    },
    {
      title: 'Mega VIP',
      id: 'megavip',
      cost: 100,
      description:
        'Dedicated coaching and support for established creators and creative businesses, plus premium features that save time and reward your patrons.',
      list: [
        'All the benefits of VIP Level',
        'Customized cameo video',
        'Personalized e-card',
      ],
      popular: false,
    },
  ],
};
