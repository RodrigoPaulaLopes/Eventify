import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OrganizerCategory } from 'src/organizer_category/entities/organizer_category.entity';
import { OrganizerCategoryService } from 'src/organizer_category/organizer_category.service';
import { CreateOrganizerCategoryDto } from './dto/create-organizer_category.dto';
@ApiBearerAuth()
@ApiTags('organizer_category')
@Controller('organizer-category')
export class OrganizerCategoryController {
    constructor(private readonly organizerCategoryService: OrganizerCategoryService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas as categorias de organizadores.' })
    @ApiOkResponse({ description: 'Retorna uma lista com todas as categorias de organizadores cadastradas.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findAll(): Promise<OrganizerCategory[]> {
        return this.organizerCategoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Listar categoria de organizador pelo id.' })
    @ApiOkResponse({ description: 'Retorna uma categoria de organizador pelo seu ID.'})
    @ApiNotFoundResponse({ description: 'Categoria de organizador não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria do organizador a ser procurado',
    })
    findById(@Param('id') id: number): Promise<OrganizerCategory> {
        return this.organizerCategoryService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar categorias de organizadores.' })
    @ApiCreatedResponse({ description: 'Categoria de organizador criada com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar uma categoria de organizador.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    create(@Body() organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {
        return this.organizerCategoryService.create(organizerCategory);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar categorias de organizadores.' })
    @ApiOkResponse({ description: 'Categoria de organizador atualizada com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar uma categoria de organizador.'})
    @ApiNotFoundResponse({ description: 'Categoria de organizador não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria do organizador a ser atualizado',
    })
    update(@Param('id') id: number, @Body() organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {
        return this.organizerCategoryService.update(id, organizerCategory);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'remover categoria de organizador.' })
    @ApiOkResponse({ description: 'Categoria de organizador removida com sucesso.'})
    @ApiNotFoundResponse({ description: 'Categoria de organizador não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria do organizador a ser deletado',
    })
    delete(@Param('id') id: number): Promise<OrganizerCategory> {
        return this.organizerCategoryService.delete(id);
    }
}
