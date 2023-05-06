import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faPaperPlane,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

const registerIcons = () => {
  library.add(faSearch, faCheck, faPaperPlane);
};

export default registerIcons;
