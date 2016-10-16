/**
 * TumblrPosts
 *
 * @class
 * @constructor
 */
var TumblrPosts = function(option){
	this.option = $.extend({}, this.option);
	this.config(option);
	this.$ = $(this);
	this.on(this.EVENT_COMPLETE, $.proxy(this._createTagData, this));
} ;

(function(fn, $){

	fn.EVENT_COMPLETE = "complete";
	fn.EVENT_PROGRESS = "progress";

	fn.option = {
		url : "/api/read/json/",
		restPath : "/api/read/json/",
		domain : null,
		maxNum : 0
	};

	fn.$ = null;
	fn.offset = 0;
	fn.step = 50;
	fn.posts = [];
	fn.tags = [];

	/**
	 * Config
	 * - pass the string name to get the value
	 * - pass the object to set the value
	 * - pass none to get the all values
	 * - if arg has "domain", "url" will be updated
	 *
	 * @param String|Object arg (optional)
	 */
	fn.config = function(arg){
		if(typeof arg === "undefined"){
			return this.option;
		} else if(typeof arg === "string"){
			return this.option[arg];
		} else if(Object.prototype.toString.call(arg) === "[object Object]"){
			$.extend(this.option, arg);
			if("domain" in arg && this.config("domain")){
				this.config({
					url : "//" + this.config("domain") + this.config("restPath")
				});
			}
		}
		return this;
	};

	/**
	 * Aliase to jQuery.fn.on()
	 */
	fn.on = function(){
		this.$.on.apply(this.$, arguments);
	};
	fn.bind = fn.on;

	/**
	 * Aliase to jQuery.fn.off()
	 */
	fn.off = function(){
		this.$.off.apply(this.$, arguments);
	};
	fn.unbind = fn.off;

	/**
	 * Aliase to jQuery.fn.trigger()
	 */
	fn.trigger = function(){
		this.$.trigger.apply(this.$, arguments);
	};

	/**
	 * Start to load files by API
	 */
	fn.run = function(data, status){
		var i, post;

		if(! data){
			this.posts = [];
			this.tags = [];
		}
		else {
			if(data.posts.length){
				for(i=0; i<data.posts.length; i+=1){
					if(this.posts.length >= this.config("maxNum")){
						this.trigger(this.EVENT_COMPLETE);
						return;
					}
					post = data.posts[i];
					this.posts.push(post);
					if(post.tags){
						this.tags = this.tags.concat(post.tags);
					}
				}
			} else {
				this.trigger(this.EVENT_COMPLETE);
				return;
			}
			this.offset += this.step;
			this.trigger(this.EVENT_PROGRESS);
		}

		$.ajax({
			url : this.option.url,
			data : {
				start : this.offset,
				num : this.step
			},
			dataType : "jsonp",
			success : $.proxy(this.run, this)
		});

		return this;
	};

	fn._createTagData= function(){
		var i, data, tag;

		data = {};
		for(i=0; i<this.tags.length; i++){
			tag = this.tags[i];
			data[tag] = data[tag] ? data[tag] + 1 : 1;
		}
		this.tags = [];
		for(i in data){
			this.tags.push({
				name : i,
				count : data[i]
			});
		}
	};

	/**
	 * Get the posts
	 *
	 * @param Number offset (optional)
	 * @param Number count (optional)
	 * @return Array
	 */
	fn.getPosts = function(offset, count){
		var i, posts = [];
		offset = offset || 0;
		count = count || 10;
		$.each(this.posts, function(i, post){
			if( i < offset ){ return; }
			if( i >= offset + count ){ return false; }
			posts.push(post);
		});
		return posts;
	};

	/**
	 * Get the tags
	 *
	 * @param String order (optinal)
	 * @return Array
	 */
	fn.getTags = function(order){
		var tags = this.tags;

		if(order){
			tags.sort(function(a, b){
				if(order === "asc"){
					return a.count - b.count;
				} else if(order === "desc"){
					return b.count - a.count;
				}
			});
		}
		return tags;
	};

	/**
	 * Get the title string from post object
	 *
	 * @param Object post
	 * @param Number count (optional)
	 * @return String
	 */
	fn.getTitleByPost = function(post, count){
		var title = post["regular-title"]
			|| post["photo-caption"]
			|| post["video-caption"]
			|| post["regular-body"]
			|| post["type"]
			|| "" ;

		title = title.replace( /\<.+?\>/gi, "" );
		title = ( count ) ? title.substr( 0, count ) : title;
		return title;
	};

}(TumblrPosts.prototype, jQuery));

