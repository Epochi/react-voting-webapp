import React, { PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';

const cx = classNames.bind(Object.assign(styles, layout, grid));

//<i class="material-icons">thumb_up</i>

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { selectedPort } = this.props;
    this.props.fetchPostsIfNeeded(selectedPort);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPort !== this.props.selectedPort) {
      const { selectedPort } = nextProps;
      this.props.fetchPostsIfNeeded(selectedPort);
    }
  }

  handleChange(nextPort) {
    this.props.selectPort(nextPort);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { selectedPort } = this.props;
    this.props.invalidatePort(selectedPort);
    this.props.fetchPostsIfNeeded(selectedPort);
  }

  render () {
         const {posts, isFetching, lastUpdated, error } = this.props;
                return (
                <main className={cx('mdl-layout__content',"main-view")}>
                    <div className={cx('mdl-grid','main-grid')}>
                          {posts.map((post, i) =>
                              <Post
                                key={post._id}
                                {...post}
                            />
                        )}
                    </div>
                </main>
            );
  }
}


PostsView.propTypes = {
  selectedPort: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

export default PostsView;