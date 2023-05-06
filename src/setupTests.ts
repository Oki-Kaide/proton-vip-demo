import '@testing-library/jest-dom/extend-expect';
import registerFaIcons from './util/services/fontawesome.service';

window.scrollTo = jest.fn();
registerFaIcons();
