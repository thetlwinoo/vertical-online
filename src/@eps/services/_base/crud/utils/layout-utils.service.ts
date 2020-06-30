import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent,
} from 'app/views/partials/content/crud';

export enum MessageType {
  Create,
  Read,
  Update,
  Delete,
}

@Injectable()
export class LayoutUtilsService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showActionNotification(
    _message: string,
    _type: MessageType = MessageType.Create,
    _duration = 10000,
    _showCloseButton = true,
    _showUndoButton = true,
    _undoButtonDuration = 3000,
    _verticalPosition: 'top' | 'bottom' = 'bottom'
  ) {
    const _data = {
      message: _message,
      snackBar: this.snackBar,
      showCloseButton: _showCloseButton,
      showUndoButton: _showUndoButton,
      undoButtonDuration: _undoButtonDuration,
      verticalPosition: _verticalPosition,
      type: _type,
      action: 'Undo',
    };
    return this.snackBar.openFromComponent(ActionNotificationComponent, {
      duration: _duration,
      data: _data,
      verticalPosition: _verticalPosition,
    });
  }

  deleteElement(title = '', description = '', waitDesciption = '') {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: { title, description, waitDesciption },
      width: '440px',
    });
  }

  fetchElements(_data) {
    return this.dialog.open(FetchEntityDialogComponent, {
      data: _data,
      width: '400px',
    });
  }

  updateStatusForEntities(title, statuses, messages) {
    return this.dialog.open(UpdateStatusDialogComponent, {
      data: { title, statuses, messages },
      width: '480px',
    });
  }
}
