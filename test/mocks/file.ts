import { JSDOM } from 'jsdom';
const dom = new JSDOM();
const FakeFileClass = jest.spyOn(dom.window, 'File');

export default FakeFileClass;
