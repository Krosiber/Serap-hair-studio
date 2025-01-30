import { Request, Response } from 'express';
import { Content } from '../models/Content';


export const getGaleri = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({}, 'anasayfa.galeri');
    res.status(200).json(content?.anasayfa?.galeri ?? []);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const addGaleriItem = async (req: Request, res: Response) => {
  try {
    const { resimUrl } = req.body;
    
    const content = await Content.findOneAndUpdate(
      {},
      { $push: { 'anasayfa.galeri': { resimUrl, createdAt: new Date() } } },
      { new: true, upsert: true }
    );

    res.status(201).json(content?.anasayfa?.galeri);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const updateGaleriItem = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate(
      { 'anasayfa.galeri._id': req.params.id },
      { $set: { 'anasayfa.galeri.$': req.body } },
      { new: true }
    );
    res.status(200).json(content?.anasayfa?.galeri);
  }catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const deleteGaleriItem = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate(
      {},
      { $pull: { 'anasayfa.galeri': { _id: req.params.id } } },
      { new: true }
    );
    res.status(200).json(content?.anasayfa?.galeri);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const getHizmetler = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({}, 'hizmetler');
    res.status(200).json(content?.hizmetler ?? []);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const addHizmet = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate(
      {},
      { $push: { hizmetler: req.body } },
      { new: true, upsert: true }
    );
    res.status(201).json(content?.hizmetler);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const updateHizmet = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate(
      { 'hizmetler._id': req.params.id },
      { $set: { 'hizmetler.$': req.body } },
      { new: true }
    );
    res.status(200).json(content?.hizmetler);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const getKurumsal = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({}, 'kurumsal');
    res.status(200).json(content?.kurumsal);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const updateKurumsal = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate(
      {},
      { $set: { kurumsal: req.body } },
      { new: true, upsert: true }
    );
    res.status(200).json(content.kurumsal);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};