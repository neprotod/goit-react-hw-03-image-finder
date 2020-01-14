/* eslint-disable no-underscore-dangle */
import config from '../config';

export default class Pixabay {
  baseUrl = 'https://pixabay.com/api';

  api = {
    // What find?
    q: 'forest',
    // Page number. Default 1
    page: 1,
    // Privat key
    key: config.id,
    image_type: 'photo',
    orientation: 'horizontal',
    // Hom much item for one request
    per_page: 12,
  };

  /**
   *
   * @param {Array} items big requst array
   * @return {Array} pretty array to work in other components
   */
  _transformResourse = items => {
    return items.reduce((prettyArray, { webformatURL, largeImageURL }) => {
      prettyArray.push({
        webformatURL,
        largeImageURL,
      });
      return prettyArray;
    }, []);
  };

  /**
   * Get images
   *
   * @param {string | null} q what need to find
   * @param {number} page pagination
   * @return {Array} [] if not find or array images
   */
  getResourse = async (q = null, page = 0) => {
    const { api, baseUrl, _transformResourse } = this;
    if (q !== null) api.q = q;
    if (page) api.page = page;

    // Nothing to find
    if (!api.q) return [];

    // Create query string
    const query = Object.entries(api).reduce((acc, [key, value]) => {
      const sing = (acc && '&') || '?';

      return `${acc}${sing}${key}=${value}`;
    }, '');

    const res = await fetch(baseUrl + query);

    if (!res.ok) {
      throw new Error('Coud not fetch');
    }

    const result = await res.json();

    return _transformResourse(result.hits);
  };

  /**
   * Reset to default params
   */
  resetApi = () => {
    const { api } = this;
    api.q = '';
    api.page = 1;

    return true;
  };

  /**
   * Get resourse for next page
   * @return {Array} [] if not find or array images
   */
  nextPage = async () => {
    const { api, getResourse } = this;
    api.page += 1;

    const result = await getResourse();
    return result;
  };
}
