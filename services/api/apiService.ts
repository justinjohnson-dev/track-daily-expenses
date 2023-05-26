interface User {
  sub: string;
}

export default class ApiService {
  // Specify the base URL of your API
  static baseUrl = '/api';

  static async fetchExpensesByMonth(
    userSub: User['sub'],
    month: number,
  ): Promise<any> {
    const url = `${this.baseUrl}/expenses/${userSub}/${month}/labels`;
    return await this.fetchData(url);
  }

  static async fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
}
