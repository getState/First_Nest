import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

//데이터베이스 파트

@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:number) : Movie{
        const movie  =  this.movies.find(movie=>movie.id===id);
        if(!movie){
            throw new NotFoundException(`Movie with Id ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id:number) : boolean{
        // +id하면 string -> number
        this.movies.filter(movie=> movie.id !== id);
        return true;
    }

    create(movieData : CreateMovieDto){
        this.movies.push({
            id: this.movies.length+1,
            ...movieData
        });
    }

    update(id:number, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
