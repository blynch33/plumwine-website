import React from 'react';

const MusicPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Music</h1>
      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1952882187%3Fsecret_token%3Ds-A6iIzH7enVX&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/plumwine-38807431" title="plumwine" target="_blank" style="color: #cccccc; text-decoration: none;">plumwine</a> · <a href="https://soundcloud.com/plumwine-38807431/sets/website" title="written by plumwine" target="_blank" style="color: #cccccc; text-decoration: none;">written by plumwine</a></div>
    </div>
  );
};

export default MusicPage;