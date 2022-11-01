import { Project } from './project';
import { Todo } from './todo';
import Storage from './storage';

if (Storage.storageAvailable('localStorage')) {
  console.log('localStorage is available');
}
else {
  console.log('localStorage is not available');
}