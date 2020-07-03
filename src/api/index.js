import { apiService, serialize } from '@/utils';

export default {
  getTableData (url, request) {
    request.sortDesc = request.sortDesc ? 'desc' : 'asc'
    console.log('test', process.env.VUE_APP_API_URL);
    return apiService(`${url}?${serialize(request)}`)
  }
};