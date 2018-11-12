import * as fetch from 'jest-fetch-mock'
const globalAny:any = global; // avoid ts complaining about fetch in global namespace

globalAny.fetch = fetch

