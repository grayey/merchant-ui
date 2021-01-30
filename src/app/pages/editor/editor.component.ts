import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fury-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  text = `<h1 class="ql-align-center">Quill Rich Text Editor</h1><p><br></p><p>Quill is a free, <a href="https://github.com/quilljs/quill/" target="_blank">open source</a> WYSIWYG editor built for the modern web. With its <a href="https://quilljs.com/docs/modules/" target="_blank">modular architecture</a> and expressive <a href="https://quilljs.com/docs/api/" target="_blank">API</a>, it is completely customizable to fit any need.</p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/253905163" height="280" width="500"></iframe><p><br></p><h2 class="ql-align-center">Getting Started is Easy</h2><pre class="ql-syntax" spellcheck="false"><span class="hljs-comment">// &lt;link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet"&gt;</span>
<span class="hljs-comment">// &lt;script src="https://cdn.quilljs.com/1.2.6/quill.min.js"&gt;&lt;/script&gt;</span>

<span class="hljs-keyword">var</span> quill = <span class="hljs-keyword">new</span> Quill(<span class="hljs-string">'#editor'</span>, {
  modules: {
    toolbar: <span class="hljs-string">'#toolbar'</span>
  },
  theme: <span class="hljs-string">'snow'</span>
});
</pre>`;

  form = new FormControl(this.text);

  constructor() { }

  ngOnInit() {
  }

}
