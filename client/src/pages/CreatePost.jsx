import React, {useState} from 'react'
import { useNavigate }  from 'react-router-dom'

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';



const CreatePost = () => {
const navigate = useNavigate();
const [form, setForm] = useState({
  name:'',
  prompt:'',
  photo:'',
});
const[generatingImg, setGeneratingImg] = useState(false);
const [loading, setLoading] = useState(false);

const generateImage = async () => {
if(form.prompt){
  try {
    setGeneratingImg(true);
    //https://dalle-backend-s4lh.onrender.com/ vs http://localhost:8080/
    const response = await fetch('https://dalle-backend-s4lh.onrender.com/api/v1/gemini', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt: form.prompt}),
    })

    const data = await response.json();
    if (data.image) {
      setForm({ ...form, photo: data.image });
    }
    
  } catch (error) {
    alert(error);
  } finally {
    setGeneratingImg(false);
  }
} else {
  alert('Please enter a prompt')
}
}

const handleSubmit = async (e) => {
e.preventDefault();

if(form.prompt && form.photo){
  setLoading(true);

  try {
    const response = await fetch('https://dalle-backend-s4lh.onrender.com/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(form)

    })
    
    await response.json();
    navigate('/');
  } catch (error) {
    alert(error)
  } finally{
    setLoading(false);
  }
}else{
  alert('Please enter a prompt and generate an image')
}
}

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value})
}

const handleSurpriseMe = () => {
const randonPrompt = getRandomPrompt(form.prompt);
setForm({ ...form, prompt: randonPrompt})
}

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
      <p className='mt-2 text=[#666e75] text-[14px] max-w[500px]'> <strong className='font-extrabold text-[#6469ff] text-[32px]'>Create</strong> your own <strong className='font-extrabold text-[#222328] text-[32px]'><br/>imaginative and visually stunning images</strong><br/> through <strong className='font-extrabold text-[#222328] text-[32px]'><span className='text-[#6469ff]'>warris</span> DALL-E AI Clone</strong> and share them with the <strong className='font-extrabold text-[#222328] text-[32px]'>Community</strong></p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
          LabelName="Your name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          handleChange={handleChange}
           />
               <FormField
          LabelName="Prompt"
          type="text"
          name="prompt"
          placeholder="A Samurai riding a Horse on Mars, lomography."
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe = {handleSurpriseMe}
           />

           <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center'>
            {
              form.photo ? (
                <img
                src={form.photo} 
                alt={form.prompt}
                className='w-full h-full object-contain'
                />
              ) :(
                <img
                src={preview}
                alt="preview"
                className='w-full h-full object-contain opacity-40'/>
              )
            }
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center 
              items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
           </div>
        </div> 
        <div className='mt-5 flex gap-5'>
          <button
          type='button'
          onClick={generateImage}
          className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
         <p className='mt-2 text-[#666e75] text-[14px]'>Once 
         you have created the image you desire, feel free to share 
         with others in the community</p>
         <button
          type='submit'
          className='mt-3 text-white bg-[#6469ff] font-medium 
          rounded-md text-sm w-full sm:w-auto px-3 py-2.5 text-center'
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
