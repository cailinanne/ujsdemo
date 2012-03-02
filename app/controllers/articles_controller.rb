class ArticlesController < ApplicationController

    def index
        @articles = Article.all

        respond_to do |format|
            format.html # index.html.erb
            format.json { render :json =>  @articles }
        end
    end

    def show
        @article = Article.find(params[:id])

        respond_to do |format|
            format.html { render :layout => ! request.xhr? }
            # Default behavior -> renders show.js.erb
            format.js {}
            format.json { render :json =>  @article }
        end
    end

    def new
        @article = Article.new
        @data_type = :json
    end

    def edit
        @article = Article.find(params[:id])
        @data_type = :script
    end

    def create
        @article = Article.new(params[:article])

        respond_to do |format|
            if @article.save
                format.html { redirect_to @article, :notice => 'Article was successfully created.' }
                # Send back the new article, we'll render it on the client side
                format.json { render :json =>  @article, :status => :created, :location => @article }
            else
                format.html { render :action => "new" }
                # Send back the errors as JSON, we'll render them on the client side
                format.json { render :json =>  @article.errors, :status => :unprocessable_entity }
            end
        end
    end

    def update
        @article = Article.find(params[:id])

        respond_to do |format|
            if @article.update_attributes(params[:article])
                # Redirect to the article template
                format.html { redirect_to @article, :notice => 'Article was successfully updated.' }
                format.js { render :js => "window.location.replace('#{article_path(@article)}');"}
            else
                format.html { render :action => "edit" }
                # Renders update.js.erb which replaces the body of the form with a newly
                # rendered version that will include the form errors
                format.js {}
            end
        end
    end

    def destroy
        @article = Article.find(params[:id])
        @article.destroy

        respond_to do |format|
            format.html { redirect_to articles_url }
            format.json { head :ok }
        end
    end
end
