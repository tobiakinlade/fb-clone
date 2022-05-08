import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import {
  CameraIcon,
  VideoCameraIcon,
  videoCameraIcon,
} from '@heroicons/react/solid';
import { useRef } from 'react';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import { useState } from 'react';

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    const docRef = await addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, imageToPost, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      }
    );
    inputRef.current.value = '';
    setImageToPost(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className='bg-white p-2 rounded-2xl shadow:md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className='rounded-full'
          width={40}
          height={40}
          src={session.user.image}
          layout='fixed'
        />
        <form className='flex flex-1'>
          <input
            type='text'
            placeholder={`What's on your mind ${session.user.name}`}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            ref={inputRef}
          />
          <button type='submit' hidden onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'
            onClick={removeImage}
          >
            <img className='h-10 object-contain' src={imageToPost} alt='' />
            <p className='text-red-500 text-center text-sm'>Remove</p>
          </div>
        )}
      </div>

      <div className='flex space-x-5 justify-evenly border-t p-3'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type='file'
            hidden
          />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
