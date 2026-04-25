import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://10.60.218.189');
pb.autoCancellation(false);