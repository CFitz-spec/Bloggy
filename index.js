//Imports
import express from "express";
import bodyParser from "body-parser";

//Start up the App
const app = express();
const port = 3000;


//Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



// Stores the blog posts
let blogPosts = [];

 
/**
 * // Constructor for the blog posts
 * @param {String} title 
 * @param {String} content 
 * @param {String} author 
 */
class blogPost{
    constructor(title,content,author){
        this.title = title;
        this.content = content;
        this.date = new Date();
        this.author = author;
    }
};

// Function to add a blog post
function addPost(title,content,author){
    let blog = new blogPost(title,content,author);
    compiler(blog);
    return(blog);
};

/**
 * // Function to add blog post to blogPosts array
 * @param {blogPost} title New class created from addPost Function.
 */
function compiler (title){
    blogPosts.push(title);
};

/**
 * deletes post
 * @param {number} index Location in blogPosts of blog to be deleted.
 */
function deletePost(index){
    blogPosts.splice(index,1);
}
/**
 * Function to edit posts uses update
 * @param {number} index Location in blogPosts of blog to be edited
 * @param {string} title Name of edited blog
 * @param {string} content content of edited blog
 * @param {string} author author of original blog
 */
function editPost(index,title,content,author){
    blogPosts.splice(index,1,update(title,content,author));
};
/**
 * called from editPosts to enter the edited BlogPost into Array.
 * Updates time of blog post to time this function was called. 
 * @param {string} title name of updated title
 * @param {string} content body of updated content
 * @param {string} author orginal authors name
 * @returns 
 */
function update(title,content,author){
    let blog = new blogPost(title,content,author);
    return(blog);
};
//Page rendering

//HomePage
app.get("/",(req,res) =>{
    res.render("index.ejs", {blogs: blogPosts});
})

/**
 * First gets id from data sent. 
 * sets index as the blogs id
 * sets post as blog object from blogPosts array
 * renders view.ejs with PostId (location within BlogPosts Array) and Post object. 
 */
app.get("/view/:id",(req,res)=>{
    let index = req.params.id;
    let post = blogPosts[index];
    
    res.render("view.ejs",{
        postId: index, 
        post: post
    });
});
/**
 * First gets the body from postId passsed across from view.ejs
 * Then calls deletePost function to delete blog object from array
 * redirects to homepage after blog deleted. 
 */
app.post("/delete",(req,res)=>{
    const deleteId = req.body["postId"];
    deletePost(deleteId);
    res.redirect("/");
});
/**
 * First gets body from postId passed from view.ejs
 * gets editPost object from blogPost array
 * render create.ejs with 
 */
app.post("/edit",(req,res)=>{
    const editId = req.body["postId"];
    const editPost = blogPosts[editId];
    res.render("create.ejs",{
        editId: editId,
        editPost :editPost
    });
});
/**
 * First gets the body from create.ejs
 * Then uses editPost function to add blogpost object back into the array
 */
app.post("/update",(req,res)=>{
    const updateId = req.body["updateId"];
    const updateTitle = req.body["updateTitle"];
    const updateContent = req.body["updateContent"];
    const author = req.body["updateAuthor"];
    editPost(updateId,updateTitle,updateContent,author);
    res.redirect("/");
});
/**
 * When nav bar button create is clicked on
 * renders create.ejst
 */
app.get("/create",(req,res)=>{
    res.render("create.ejs");
});
/**
 * First gets body from create.ejs
 * Passes body content to addPost function to create a new blogPost object
 * redirects to homepage
 */
app.post("/newPost",(req,res)=>{
    const newTitle =req.body["title"];
    const newContent = req.body["content"];
    const newAuthor = req.body["author"];
    addPost(newTitle,newContent,newAuthor);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    addPost("Lorem Ipsum",`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit est non libero lobortis posuere. Sed congue molestie urna, in hendrerit risus varius et. Sed interdum nunc lorem, vitae blandit eros laoreet eu. Suspendisse suscipit nisi a sodales efficitur. Donec dictum vehicula auctor. Curabitur porttitor interdum dui sit amet facilisis. Praesent at ante nec dolor dignissim ultrices. Sed diam mi, dignissim id purus in, dictum lacinia turpis. Maecenas ullamcorper volutpat felis ut fermentum. Donec viverra est ut semper placerat.Cras eget pretium dolor, quis porttitor magna. Mauris vehicula leo urna, eget rhoncus erat laoreet non. 
Mauris sollicitudin ante erat, id ornare purus pharetra sed. Vestibulum sed rhoncus nisl, nec volutpat nibh.Morbi pellentesque sit amet sem volutpat vestibulum. Curabitur posuere feugiat metus placerat imperdiet. Etiam pharetra, eros quis gravida suscipit, nunc sem mattis arcu, eu accumsan odio tellus in leo.Proin suscipit enim augue. Fusce id augue id dolor vehicula fermentum vitae at justo. Donec accumsan dui erat, venenatis aliquet elit fermentum eu. Sed imperdiet lectus nec dignissim dapibus. Nunc sodales diam nec malesuada fermentum.Phasellus nec lacinia risus. Duis fermentum vulputate odio, eget gravida eros sagittis non. Donec dui lectus,fringilla eget dapibus in, finibus at purus.`, "Cayman.Fitzhugh");

    addPost("Backyard Campout Bliss: Memories Made Under the Stars",`Summer whispers of adventure, and while grand camping trips hold undeniable charm, sometimes reality throws up a "wait a minute" sign. But fear not! The magic of nature and unforgettable moments can be found much closer than you think – your very own backyard!
        Transform your backyard into a cozy campsite, perfect for families, friends, or even a solo retreat under the twinkling night sky. This blog post equips you with everything you need to create a backyard campout that sparks joy for all ages.
        Setting the Stage for Adventure:
        First things first, craft a comfortable haven. Pitch a tent, build a blanket fort that ignites childhood memories, or string up a hammock for a gently swaying night's sleep. Fairy lights strung across trees, flickering citronella candles, and a crackling fire pit (where permitted) weave an enchanting atmosphere. Don't forget plush blankets, pillows, and cozy sleeping bags for ultimate comfort under the vast canvas of stars.
        Unleashing the Fun:
        Board games under the twinkling lights, a game of flashlight tag that erupts in laughter, or sharing spooky (or silly!) stories around the fire – plan activities that cater to everyone's interests. As darkness descends, spread out a blanket and embark on a celestial adventure. Stargazing apps can help you identify constellations and planets, turning your backyard into a mini-astronomy observatory. Explore your own backyard! Look for buzzing insects, flitting birds, and other fascinating creatures. It's a fantastic opportunity to nurture a love for the natural world, especially for curious young minds.
        Taking it Up a Notch:
        Want to elevate your backyard campout?  Themed nights inject an extra dose of excitement! Pitch a pirate tent complete with a treasure hunt, transform your yard into a prehistoric paradise with dino-themed snacks, or build a fairy village adorned with twinkling lights. Let your imagination be your guide!
        Outdoor movie nights are another way to make memories. Project a classic film onto a sheet hung between trees, snuggle up with blankets, and popcorn (s'mores anyone?), and create a backyard cinema experience under the stars. Speaking of s'mores, no campout is complete without them! Roast marshmallows over the fire and create gooey, delicious treats that melt in your mouth and linger in your memories.
        A Campout for Everyone:
        Backyard campouts offer an escape to nature without the hassle – or expense – of a traditional camping trip. The beauty lies in its adaptability.  Whether you crave a quiet night gazing at the stars or a laughter-filled adventure with loved ones, your backyard campout awaits.
        So grab your tent, gather your favorite people, and get ready to experience the magic of the outdoors, right in the comfort (and safety) of your own backyard.`,
        "AI Gemini");
    addPost("Backyard Campout Bliss: Memories Made Under the Stars", `Does your kitchen feel more like an obstacle course than a culinary haven? Expired spices, mismatched mugs, and overflowing utensil drawers can leave even the most enthusiastic cook feeling defeated. But fear not! With a strategic kitchen cleanout, you can transform your space into a haven of organization and inspiration.
    This blog post equips you with a step-by-step approach to declutter your kitchen, maximizing efficiency and sparking joy (yes, you read that right!) in the process.
    Decluttering with a Smile:
    The key to a successful cleanout lies in a mindshift – approach it not as a chore, but as an opportunity to create a space you love.  Gather some upbeat music, grab a few sturdy boxes, and get ready to tackle the clutter with a smile!
    The Tackle Box Approach:
    Divide your cleanout into manageable sections. Start with your cabinets and drawers.  Remove everything and categorize items: keep, toss, donate, or relocate (think: rarely used appliances banished to a high shelf).  Be ruthless with expired items, chipped mugs, and utensils you never reach for.  For the "keep" pile, utilize space-saving organizers like clear containers and drawer dividers.
    Pantry Power:
    Next, conquer your pantry. Sort through canned goods, dry ingredients, and forgotten snacks. Check expiration dates – donate unopened, unexpired items to a local food bank. Utilize clear containers for dry goods, labeling them for easy identification. This not only reduces waste but also streamlines meal prepping.
    Appliance Audit:
    Give your appliances a once-over. Do you use that bulky juicer you received as a gift five years ago?  If not, consider donating it or selling it online to free up valuable counter space.
    Cleaning with a Purpose:
    Once the decluttering is complete, give your kitchen a thorough cleaning. Wipe down surfaces, scrub appliances, and don't forget to clean out your oven (baking soda and vinegar are your friends here!).  A clean kitchen not only looks and feels better, but it's also more hygienic.
    Maintaining the Magic:
    Here's the secret to long-term decluttering success:  establish a "one-in, one-out" rule. Before buying a new appliance or gadget, consider if it has a permanent home in your kitchen and if it truly adds value.
    A Kitchen that Inspires:
    By decluttering your kitchen, you're not just creating a more organized space, you're fostering a space that inspires culinary creativity. With easy-to-find ingredients, accessible tools, and clean surfaces, you'll be whipping up delicious meals (and maybe even trying new recipes!) in no time. So, roll up your sleeves, crank up the music, and get ready to transform your kitchen into a space that sparks joy, not just when it's clean, but every time you step foot in it.`
    ,"AI again")
  });