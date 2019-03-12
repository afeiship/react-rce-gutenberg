import { Component, AfterViewInit } from '@angular/core';
import { data, editPost } from '@frontkom/gutenberg-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-gutenberg';

  ngAfterViewInit(): void {
    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: true,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 10,
      canPublish: false,
      canSave: true,
      canAutosave: true,
      mediaLibrary: false,
      postLock: {
          isLocked: false,
      }
    };

    // reset localStorage
    localStorage.removeItem('g-editor-page');

    // Disable tips
    data.dispatch('core/nux').disableTips();
    editPost.initializeEditor('editor', 'page', 1, settings, {});
  }
}
