
import React from 'react';
import ReactQuill from 'react-quill';
import "../styles/Editor.sass"

interface EditorProps {
  text: string;
  maxLength: number;
  placeholder: string;
  handleChange: (html: string) => void;
}

interface EditorState {

}

class Editor extends React.Component<EditorProps, EditorState> {
  public quillRef: any;
  public reactQuillRef: any;

  /**
   * Constructor for the Editor class.
   *
   * @param {EditorProps} props - The props object containing the initial state of the Editor.
   */
  constructor (props: EditorProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null;
  }

  /**
   * Component lifecycle method that is called after the component is mounted
   * onto the DOM. It attaches the Quill refs.
   *
   * @param {void} None
   * @return {void} None
   */
  componentDidMount() {
    this.attachQuillRefs()
  }

  /**
   * Updates the component after a re-render.
   *
   * No parameters.
   *
   * No return value.
   */
  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  /**
   * Handles the change event of the input field.
   *
   * @param {string} html - The HTML content of the input field.
   * @return {void}
   */
  handleChange (html: string) {
    var limit = this.props.maxLength;
    var quill = this.quillRef;

    quill.on('text-change', function (delta: any, old: any, source: any) {
      if (quill.getLength() > limit) {
       quill.deleteText(limit, quill.getLength());
      }
    });

    this.props.handleChange(html);
  }

  /**
   * Renders the component.
   *
   * @return {JSX.Element} The rendered component.
   */
  render () {
    const { text } = this.props;
    return (
      <div className="editor">
        {typeof window !== 'undefined' ? (
          <ReactQuill 
            placeholder={this.props.placeholder}
            ref={(el) => { this.reactQuillRef = el }}
            value={text}
            onChange={this.handleChange} 
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image',
              'code-block'
            ]}
            modules={{
              // syntax: true,
              toolbar: ['bold', 'italic', 'underline', 'link', 'code-block', 'list']
            }}
          />
        ) : ''}
      </div>
    )
  }
}

export default Editor;
