'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';

const Form = () => {
    const [itemName, setItemName] = useState("");
    const [urls, setUrls] = useState([
      { title: "img1", src: "", alt: "N/A" },
      { title: "img2", src: "", alt: "N/A" },
      { title: "img3", src: "", alt: "N/A" },
      { title: "img4", src: "", alt: "N/A" }
    ]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const router = useRouter();
    
    if (price < 1){
      setPrice(1)
    }

    const handleSubmit = async (e) => {
      console.log("send")
      e.preventDefault(); //Preventing browser auto refresh

      try {
        //envoie les infos au server pour créer l'item dans la db
        const response = await fetch('/api/items/new', {
          method: "POST",
          body: JSON.stringify({
            itemName : itemName,
            urls : urls,
            category : category,
            price : price,
            description : description
          })
        })
        console.log(response.json())
        if(response.ok) {
          router.push('/')
      } 
      } catch (error) {
        console.log(error)
      }
    };


    const handleUrlChange = (index, field, value) => {
      const updatedUrls = [...urls];
      updatedUrls[index][field] = value;
      setUrls(updatedUrls);
    };

    const handleCategoryChange = (event) => {
      const selectedCategories = Array.from(event.target.selectedOptions, (option) => option.value);
      setCategory(selectedCategories);
    };

  return (
    <section className=" w-4/6 max-w-full flex-col">
        <h1 className="head_text text-center text-4xl mb-3">
            Create Item
        </h1>
        <p className="text-center text-lg">
            Please fill in the information below
        </p>

        <form 
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 w-full max-w-2x1 flex-col gap-7 glassmorphism"
        >

{/* Item name */}
        <label className="form_label">
            <span className="font-semibold text-base text-gray-700">Item Name :</span>
            <input
                type="text"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
                placeholder="Bleach Ichigo sword"
                required
                className="form_textarea w-full"
            />
        </label>
        
{/* Item price */}
        <label className="form_label">
          <span className="font-semibold text-base text-gray-700">Item Price :</span>
          <div className="flex flex-raw align-middle items-center">
             <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="2999"
              required
              className="form_textarea w-32 mr-5"
              /> 
              <p>¥</p>
          </div>
        </label>

{/* Item description */}
        <label className="form_label">
            <span className="font-semibold text-base text-gray-700">Item Description :</span>
            <textarea className="h-24 border border-sky-400" onChange={(event) => setDescription(event.target.value)} />
        </label>

{/* Item category */}
        <label className="form_label">
            <span className="font-semibold text-base text-gray-700">Item Category :</span>
            <select className="h-16 border border-sky-400" multiple value={category} onChange={handleCategoryChange}>
              <option value="games">Games</option>
              <option value="anime">Anime</option>
            </select>
        </label>


{/* Item url */}
        <label className="form_label">
            <span className="font-semibold text-base text-gray-700">Item URL Images :</span>
            {urls.map((url, index) => (
              index === 0
              ? <div key={index} className="ml-3 mb-3"> 
                  <label className=" text-emerald-700">Image 1 <span className="text-red-500 text-xs">Required</span></label>
                  <div className="ml-3">
                    <label>Url</label>
                    <input
                      type="text"
                      onChange={(event) => handleUrlChange(index, "src", event.target.value)}
                      required
                      className="form_textarea w-full"
                      placeholder="Paste URL here"
                    />
                    <label>Quick description</label>
                    <input
                      type="text"
                      onChange={(event) => handleUrlChange(index, "alt", event.target.value)}
                      required
                      className="form_textarea w-full"
                      placeholder="Describe your image"
                    />
                  </div>
                </div>
              : <div key={index} className="ml-3 mb-3"> 
                <label className=" text-emerald-700">Image {index+1}</label>
                <div className="ml-3">
                  <label>Url</label>
                  <input
                    type="text"
                    onChange={(event) => handleUrlChange(index, "src", event.target.value)}
                    className="form_textarea w-full"
                    placeholder="Paste URL here"
                  />
                  <label>Quick description</label>
                  <input
                    type="text"
                    onChange={(event) => handleUrlChange(index, "alt", event.target.value)}
                    className="form_textarea w-full"
                    placeholder="Describe your image"
                  />
                </div>
              </div>
            ))}
        </label>

        <div className="flex-end mx-3 mt-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm" >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form