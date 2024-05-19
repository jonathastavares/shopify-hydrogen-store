// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import Draggable from 'react-draggable';
import {useEffect, useState} from 'react';
import {FaPlay} from 'react-icons/fa6';
import {IoCloseSharp} from 'react-icons/io5';

export const DraggableVideoBall = ({videoUrl}) => {
  const [hovering, setHovering] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const zoomVideo = () => {
    var frames_VidZoom_In = [
      {transform: 'scale(1, 1)', transition: 'transform 0.1s'},

      {transform: 'scale(3, 3)', transition: 'transform 0.1s'},
    ];

    //# apply animation to an element
    document
      .getElementById('vid')
      .animate(frames_VidZoom_In, {duration: 500, easing: 'ease-in'});

    document.getElementById('vid').style.transform = 'scale(3,3)';
  };

  const handleExitVideo = (e) => {
    console.log('key: ', e.key);
    if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        setExpanded(false);
      }
    }
  };

  useEffect(() => {
    zoomVideo();
  }, []);

  useEffect(() => {
    if (expanded) {
      document.addEventListener('keydown', handleExitVideo);
      document.getElementById('expanded-video')?.requestFullscreen();
    } else {
      document.removeEventListener('keydown', handleExitVideo);
      zoomVideo();
    }
  }, [expanded]);

  if (expanded) {
    return (
      <div className="bg-black backdrop-blur-sm bg-opacity-40 w-screen h-full flex items-center justify-start p-4 flex-col fixed z-[100]">
        <div className="flex items-center justify-end h-max w-full">
          <IoCloseSharp
            className="text-white text-4xl aspect-square"
            onClick={() => setExpanded(false)}
          />
        </div>
        <video
          id="expanded-video"
          src={videoUrl}
          controls
          autoPlay
          className="h-[80%] w-[80%] object-contain"
        >
          <track kind="captions"></track>
        </video>
      </div>
    );
  } else {
    return (
      <Draggable>
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="h-24 aspect-square z-[99] rounded-full absolute overflow-hidden border-4 border-gray-500 border-opacity-30 shadow-2xl flex items-center justify-center"
        >
          <video
            id="vid"
            autoPlay={true}
            muted
            src={videoUrl}
            controls={false}
            className="h-full w-full"
          >
            <track kind="captions"></track>
          </video>
          {hovering && (
            <FaPlay
              className="z-[100] text-gray-500 opacity-30 absolute text-4xl ml-2"
              onClick={() => setExpanded(true)}
            />
          )}
        </div>
      </Draggable>
    );
  }
};
