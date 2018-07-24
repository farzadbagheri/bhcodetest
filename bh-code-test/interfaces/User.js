export default class User {
  name: string;
  avatar: string;
  posts: string[];

  constructor(props: Object = {}) {
    this.avatar = props.avatar || '';
    this.name = props.name || '';
    this.posts = props.posts || {};
  }
}